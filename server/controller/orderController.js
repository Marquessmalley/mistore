const Order = require("../models/order");

module.exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid product ID" });
    }
  }
};

module.exports.createOrder = async (req, res, next) => {
  try {
    const { items, totalCost, shipping } = req.body;

    const order = await Order.create({
      items,
      totalCost,
      shipping,
    });

    res.status(200).json({ message: "Order created successfully", order });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error. Make sure fields filled out correctly.",
        err: err,
      });
    }
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid product ID" });
    }
  }
};
