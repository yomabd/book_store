const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/book.route.js");
const userRouter = require("./routes/user.route.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({
//   origin: "https://localhost/3001",
//   methods: ['GET','POST','PUT','DELETE'],
//   allowHeaders:['content-type']
// }))

app.get("/", (req, res) => {
  res.send("THIS IS BOOK STORE BACKEND");
});
app.use("/api/book", bookRouter);
app.use("/api/book", userRouter);

app.listen(3001, () => {
  console.log("i am running at port 3001!");
});

mongoose
  .connect(
    "mongodb+srv://idreesyomi:blogAbdolyom@cluster0.1jqvuf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connection to mongodb successful!");
  })
  .catch(() => {
    console.log("connection to mongodb failed!");
  });
