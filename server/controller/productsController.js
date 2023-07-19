// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Product = require("../models/product");

module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid product ID" });
    }
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, size } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      size,
    });

    res.status(200).json({ message: "Product created successfully", product });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error. Make sure fields filled out correctly.",
        err,
      });
    }
  }
};
module.exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, quantity, price, size } = req.body;
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    if (!name || !description || !quantity || !price || !size) {
      return res
        .status(400)
        .json({ message: "Make sure all fields are entered" });
    }

    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.price = price;
    product.size = size;

    const updatedProduct = await product.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    // Validation error handler
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error. Make sure fields are correct.",
        error: true,
      });
    }
    // Invalid product id
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid product ID" });
    }
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne();

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid product ID" });
    }
  }
};
