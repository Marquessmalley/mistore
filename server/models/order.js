const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  line1: { type: String, required: true },
  line2: { type: String, default: null },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true },
  state: { type: String },
});

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
    contact: {
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },

    shipping: {
      name: {
        type: String,
        required: true,
      },

      address: {
        type: addressSchema,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
