const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/book.route.js");
const userRouter = require("./routes/user.route.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("THIS IS BOOK STORE BACKEND");
});
app.use(process.env.APP_BOOK_ROUTE, bookRouter);
app.use(process.env.APP_BOOK_ROUTE, userRouter);

app.listen(3001, () => {
  console.log("i am running at port 3001!");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connection to mongodb successful!");
  })
  .catch(() => {
    console.log("connection to mongodb failed!");
  });

const jwt = require("jsonwebtoken");
const tokenVerify = (token) => {
  const decoded = jwt.verify(token, process.env.APP_SECRETE_KEY);
  console.log(decoded, " User ID from token: " + token);
};
// tokenVerify(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU0YmRlOWU1YjVjMjkxMjc2YzczNjMiLCJpYXQiOjE3MjA5MzU4NzEsImV4cCI6MTcyMDkzOTQ3MX0.vMwzN0jRVxlemMZm8W-SEoEPqToG_68AAR2rvdw5HpU"
// );
