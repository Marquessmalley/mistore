const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require("../controller/orderController");

router.get("/", getOrders);
// // router.get("/:id", getOrder);
router.post("/", createOrder);
// // router.delete("/:id", deleteOrder);

module.exports = router;
