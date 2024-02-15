const express = require("express");
const router = express.Router();

const {
  listPayments,
  createPaymentIntent,
} = require("../controller/paymentController");

router.get("/", listPayments);
router.post("/", createPaymentIntent);

module.exports = router;
