const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("../controller/paymentController");

router.post("/", createPaymentIntent);

module.exports = router;
