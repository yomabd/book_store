const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/blogPosts.js");
const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://idreesyomi:blogAbdolyom@cluster0.1jqvuf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connection to mongodb successful!");
    app.listen(3000, () => {
      console.log("i am running at port 3000!");
    });
  })
  .catch(() => {
    console.log("connection to mongodb failed!");
  });

//create a  post request
app.post("/api/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a get request
app.get("/api/posts", async (req, res) => {
  try {
    const post = await Post.find({});
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a GET request by id
app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a put request by id
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);
    if (!post) {
      return res.status(404).json({ message: "post not found!" });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a delete request by id
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "post not found!" });
    }
    res.status(200).json({ message: "post deleted" });
    // res.status(200).json(await Post.findById(id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
