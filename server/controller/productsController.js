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
    const {
      name,
      description,
      images,
      category,
      price,
      colors,
      quantity,
      sizes,
      gender,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      images,
      category,
      quantity,
      sizes,
      colors,
      gender,
      price,
    });

    res.status(200).json({ message: "Product created successfully", product });
  } catch (err) {
    // product validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error. Make sure fields filled out correctly.",
        err: err,
      });
    }
    // duplicate product names
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Product already exists.", error: true });
    }
  }
};
module.exports.updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      quantity,
      category,
      price,
      sizes,
      colors,
      gender,
    } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    if (!name || !description || !category || !quantity || !price || !sizes) {
      return res
        .status(400)
        .json({ message: "Make sure all fields are entered" });
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.quantity = quantity;
    product.price = price;
    product.sizes = sizes;
    product.colors = colors;
    product.gender = gender;

    const updatedProduct = await product.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    console.log(err);
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
