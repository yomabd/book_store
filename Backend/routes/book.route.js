const express = require("express");
const router = express.Router();

const {
  createBooks,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
} = require("../controllers/book.controller.route.js");

router.post("/", createBooks);
router.get("/", getBooks);
router.get("/:id", getBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

module.exports = router;
