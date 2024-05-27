const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/products.js");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to my backend");
});

app.get("/api/co", (req, res) => {
  res.send("This is companies sales data");
});

app.listen(3000, (req, res) => {
  console.log("Server is running at 3000 port");
});

//Get product by Id
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
