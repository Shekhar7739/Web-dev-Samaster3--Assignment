
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to local MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
  });

// Create Inventory Model
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  quantity: Number
});

// Add Product
app.post("/add", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
