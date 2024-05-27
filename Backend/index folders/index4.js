// import the require module ==> Express
const express = require("express");
const mongoose = require("mongoose");
//importing out model from products.js
const Product = require("./models/products.js");
const ProductRoutes = require("./routes/product.route.js");
//create express application
const app = express();

//creating a middleware
app.use(express.json());
//to make it possible to use form like way to perform GET request
app.use(express.urlencoded({ extended: false }));

//specifying the route and what to show to the user
app.get("/api/data", (req, res) => {
  res.send("Welcome to the backend");
});
app.use("api/products", ProductRoutes);

//configure a route to send real data
app.get("/data", (req, res) => {
  const data = [
    {
      id: 1,
      name: "Mark Zedrigex",
      stack: "Software Engineer",
      address: "Montgomery Austin TX 1234",
      status: "Employed",
      salary: 5000000,
      country: "New Zealand",
    },
    {
      id: 2,
      name: "Henry Crogan",
      stack: "Software Engineer",
      address: "Brooklyn",
      status: "Employed",
      salary: 5000000,
      country: "New Zealand",
    },
  ];
  res.json(data);
});

//update data on the database
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "product not found!" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete data from the database
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found!" });
    }
    res.status(200).json({ message: "product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get product by Id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a GET route for the data in the database
app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a POST request for our model Product in products.js
app.post("/api/products", async (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  //connecting to our DB
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://idreesyomi:Abdolyom@cluster0.sirfmc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connection successful");
    app.listen(3000, () => {
      console.log("Port listening at 3000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
