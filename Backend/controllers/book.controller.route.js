const Book = require("../models/bookModel.js");
//import objectid constructor from mongoose
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const createBooks = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(404).send({
        message: "send all required fields: title, author, published",
      });
    }
    const userId = req.user?.id;
    const bookData = { ...req.body, createdBy: userId };
    const book = await Book.create(bookData);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBooks = async (req, res) => {
  try {
    const userId = req.user?.id;
    let query = {};
    if (!userId) {
      return res.status(401).json({ message: "Unathorized! Please log in." });
    } else {
      query = { createdBy: userId };
    }
    const books = await Book.find(query);
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBook = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unathorized! Please log in." });
    }
    const { id } = req.params;
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }

    //find the book with the validated id
    const book = await Book.findById(id);
    if (!book) {
      return res.status(401).json({ message: "Book not found!" });
    }

    if (book.createdBy.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Unathorized access from other user!" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    //validate the id
    if (!ObjectId.isvalid(id)) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }
    //safely access the user object of req
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unathorized! Please log in" });
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json({ message: "book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).json({ message: "book not found!" });
    }
    const updatedbook = await Book.findById(id);
    res.status(200).json(updatedbook);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = {
  createBooks,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
};
