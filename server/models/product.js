const mongoose = require("mongoose");

const productSchema = new mongoose.mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["T-Shirt", "Hoodie", "Shorts", "Pants", "Other"], // You can add more categories as needed
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sizes: {
      type: [String],
      required: [true, "Product size is required"],
    },
    colors: {
      type: [String],
      // required: [true, "Product colors is required"],
    },

    gender: {
      type: [String],
      enum: ["Men", "Women"], // Restricting the possible values
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
  },
  { timestamps: true }
);

// Create a unique index on the "name" field
// productSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);
