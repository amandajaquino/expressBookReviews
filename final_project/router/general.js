const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Task 1: Get all books available in the shop
/* public_users.get('/', function (req, res) {
  // Get the list of books from your books database
  const bookList = books; // Assuming books is an array of books

  // Send the list of books as a JSON response using JSON.stringify
  res.status(200).send(JSON.stringify(bookList, null, 2));
}); */


// Task 10: improve task 1

// Function to simulate Axios GET request
const axiosGet = async (url) => {
  return {
    data: books,
    status: 200
  };
};

// Improved Task 1: Get all books available in the shop
public_users.get('/', async function (req, res) {
  try {
    // Simulate Axios GET request to fetch the list of books
    //const response = await axiosGet('http://your-api-url/books');
    //If you're fetching data locally (from an array in your server) and not making an actual external API call, you can use a placeholder URL or even skip it since it's not being used
    const response = await axiosGet();

    // Send the list of books as a JSON response
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Task 2: Get book details based on ISBN
/* public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn; // Get the ISBN from request parameters to retrieve the ISBN from the request parameters

  // Check if the provided ISBN exists in the books object
  if (books[isbn]) {
    // Book found, send book details
    res.status(200).json(books[isbn]);
  } else {
    // Book not found
    res.status(404).json({ message: "Book not found" });
  }
}); */

// Task 11: improve task 2
// Improved Task 2: Get book details based on ISBN using internal database with Axios
const axiosGetBookByISBN = async (isbn) => {
  try {
    // Simulate fetching book details from the internal array using Axios
    const response = await axiosGet();

    // Find the book with the specified ISBN
    const bookDetails = response.data.find(book => book.isbn === parseInt(isbn, 10));

    if (bookDetails) {
      // Return the book details
      return bookDetails;
    } else {
      // Book not found
      throw new Error('Book not found');
    }
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching book details:', error.message);
    throw error;
  }
};

public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    // Get the book details using the async function with Axios
    const bookDetails = await axiosGetBookByISBN(isbn);

    // Send the book details as a JSON response
    res.status(200).json(bookDetails);
  } catch (error) {
    // Handle errors if any
    res.status(404).json({ message: 'Book not found' });
  }
});

  
// Task 3: Get book details based on author
/* public_users.get('/author/:author', function (req, res) {
  const author = req.params.author; // Get the author from request parameters

  // Obtain all the keys for the ‘books’ object
  const bookKeys = Object.keys(books);

  // Iterate through the ‘books’ array & check the author matches the one provided in the request parameters
  const authorBooks = [];
  for (let i = 0; i < bookKeys.length; i++) {
    const book = books[bookKeys[i]];
    if (book.author === author) {
      authorBooks.push(book);
    }
  }

  if (authorBooks.length > 0) {
    // Books found, send the list of books by the author
    res.status(200).json(authorBooks);
  } else {
    // No books by the author found
    res.status(404).json({ message: "No books by the author found" });
  }
}); */
// Improved Task 3: Get book details based on author using internal database with Axios
const axiosGetBooksByAuthor = async (author) => {
  try {
    // Simulate fetching book details from the internal array using Axios
    const response = await axiosGet();

    // Filter books based on the provided author
    const authorBooks = response.data.filter(book => book.author === author);

    if (authorBooks.length > 0) {
      // Return the list of books by the author
      return authorBooks;
    } else {
      // No books by the author found
      throw new Error('No books by the author found');
    }
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching books by author:', error.message);
    throw error;
  }
};

public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    // Get the book details using the async function with Axios
    const bookDetails = await axiosGetBookByISBN(isbn);

    // Send the book details as a JSON response
    res.status(200).json(bookDetails);
  } catch (error) {
    // Handle errors if any
    res.status(404).json({ message: 'Book not found' });
  }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    // Get the books by the author using the async function with Axios
    const authorBooks = await axiosGetBooksByAuthor(author);

    // Send the list of books by the author as a JSON response
    res.status(200).json(authorBooks);
  } catch (error) {
    // Handle errors if any
    res.status(404).json({ message: 'No books by the author found' });
  }
});

// Task 4: Get books based on title
/* public_users.get('/title/:title', function (req, res) {
  const title = req.params.title; // Get the title from request parameters
  // Obtain all the keys for the ‘books’ object
  const bookKeys = Object.keys(books);

  // Iterate through the ‘books’ array & check the title matches the one provided in the request parameters
  const titleBooks = [];
  for (let i = 0; i < bookKeys.length; i++) {
    const book = books[bookKeys[i]];
    if (book.title === title) {
      titleBooks.push(book);
    }
  }

  if (titleBooks.length > 0) {
    // Books found, send the list of books with the title
    res.status(200).json(titleBooks);
  } else {
    // No books with the title found
    res.status(404).json({ message: "No books with the title found" });
  }
}); */
// Improved Task 4: Get books based on title using internal database with Axios
const axiosGetBooksByTitle = async (title) => {
  try {
    // Simulate fetching book details from the internal array using Axios
    const response = await axiosGet();

    // Filter books based on the provided title
    const titleBooks = response.data.filter(book => book.title === title);

    if (titleBooks.length > 0) {
      // Return the list of books with the title
      return titleBooks;
    } else {
      // No books with the title found
      throw new Error('No books with the title found');
    }
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching books by title:', error.message);
    throw error;
  }
};

// Improved Task 4: Get books based on title
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    // Get the books by the title using the async function with Axios
    const titleBooks = await axiosGetBooksByTitle(title);

    // Send the list of books with the title as a JSON response
    res.status(200).json(titleBooks);
  } catch (error) {
    // Handle errors if any
    res.status(404).json({ message: 'No books with the title found' });
  }
});


// Task 5: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn; // Get the ISBN from request parameters
  // Find the book in your database by ISBN
  const book = books.find((book) => book.isbn === parseInt(isbn)); // Convert ISBN to integer for comparison

  if (book && book.reviews) {
    // Book found and has reviews, send the book reviews
    res.status(200).json(book.reviews);
  } else {
    // Book not found or has no reviews
    res.status(404).json({ message: "No reviews found for the book" });
  }
});

// Task 6: Register a new user
public_users.post("/register", function (req, res) {
  const { username, password } = req.body; // Get username and password from request body

  // Check if the username already exists
  if (users.includes(username)) {
    res.status(400).json({ message: "Username already exists" });
  } else if (!username || !password) {
    // Check if username and/or password are missing
    res.status(400).json({ message: "Username and password are required" });
  } else {
    // Register the new user
    users.push(username);
    // You should store user data securely, but for this example, we're only adding the username to the list.
    res.status(201).json({ message: "User registered successfully" });
  }
});


module.exports.general = public_users;
