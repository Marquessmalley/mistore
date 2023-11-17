require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product");
const fs = require("fs");

// Read product.json file
const rawData = fs.readFileSync("./dev-data/products.json");

// Establish DB connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to database successfully"));

// Parse into JS obj
const products = JSON.parse(rawData);

// Insert dev data into MongoDB
Product.insertMany(products)
  .then(() => {
    console.log("Data imported successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error importing data:", err);
    mongoose.connection.close();
  });
