const express = require("express");
const router = express.Router();
const { verifyJWT } = require("./../controllers/user.controller.route.js");
const {
  createBooks,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
} = require("../controllers/book.controller.route.js");

router.post("/", verifyJWT, createBooks);
router.get("/", verifyJWT, getBooks);
router.get("/:id", verifyJWT, getBook);
router.delete("/:id", verifyJWT, deleteBook);
router.put("/:id", verifyJWT, updateBook);

module.exports = router;
