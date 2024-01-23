const mongoose = require("mongoose");

// Create a Order schema
const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: [true, "Items are required for order."],
    },
    totalCost: {
      type: Number,
      required: true,
    },

    shipping: {
      fullName: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      // Add more shipping details as needed
      // For example, phone number, email, etc.
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
