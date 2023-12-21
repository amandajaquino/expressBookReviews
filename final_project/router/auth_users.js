const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

// Task 7: Login
let users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  // Add more users as needed
];

const isValid = (username) => {
  // Assuming a valid username should be at least 4 characters long
  return username && username.length >= 2;
}

const authenticatedUser = (username, password) => {
  // Check if the provided username and password match any user in records
  return users.some(user => user.username === username && user.password === password);
}


// only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;//extract username from request body
	const password = req.body.password;//extract password from request body

  if (!isValid(username)) { 
    return res.status(400).json({ message: "Invalid username" });
  } // Check if username is valid
  if (!username || !password) {
    return res.status(404).json({ message: "Username and password are required" });
  } // Check if username and/or password are missing
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = { accessToken, username };
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }// Check if the username and password are incorrect or invalid
});

//suggested solution by AI
// only registered users can login
/* regd_users.post("/login", (req, res) => {
  const { username, password } = req.body; // Get username and password from request body

  if (!username || !password) {
    // Check if username and/or password are missing
    res.status(400).json({ message: "Username and password are required" });
  } else if (!isValid(username) || !authenticatedUser(username, password)) {
    // Check if the username and password are incorrect or invalid
    res.status(401).json({ message: "Invalid username or password" });
  } else {
    // Sign the JWT token
    const token = jwt.sign({ username }, 'secret_key');
    res.status(200).json({ token });
  }
}); */

// Task 8: Add or modify a book review
// Add or modify a book review
regd_users.put("/review/:isbn", (req, res) => {
  // Write your code here
  const { isbn } = req.params;
  const { review } = req.query;
  const { token } = req.headers;

  // Verify the user's token
  const user = users.find(u => u.token === token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Check if the user has already reviewed the book with the given ISBN
  const existingReviewIndex = books.findIndex(book => book.isbn === isbn && book.username === user.username);

  if (existingReviewIndex !== -1) {
    // If the user has already reviewed the book, modify the existing review
    books[existingReviewIndex].review = review;
    return res.json({ message: "Review modified successfully" });
  } else {
    // If the user hasn't reviewed the book, add a new review
    books.push({ isbn, username: user.username, review });
    return res.json({ message: "Review added successfully" });
  }
});

// Task 9: Delete a book review
// Delete a book review
regd_users.delete("/review/:isbn", (req, res) => {
  // Write your code here
  const { isbn } = req.params;
  const { token } = req.headers;

  // Verify the user's token
  const user = users.find(u => u.token === token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Filter and delete the reviews based on the session username
  books = books.filter(book => !(book.isbn === isbn && book.username === user.username));

  return res.json({ message: "Review deleted successfully" });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

