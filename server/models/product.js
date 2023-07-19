const mongoose = require("mongoose");

const productSchema = new mongoose.mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  images: {
    type: [String],
    // required: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },
  size: [
    {
      type: String,
      required: [true, "Product size is required"],
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
