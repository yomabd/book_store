const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();

const {
  signup,
  signin,
  verifyJWT,
} = require("../controllers/user.controller.route");

router.post("/register", signup);
router.post("/login", signin);

module.exports = router;
