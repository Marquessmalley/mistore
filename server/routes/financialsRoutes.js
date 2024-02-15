const express = require("express");
const router = express.Router();
const { accountBalance } = require("../controller/financialsController");

router.get("/", accountBalance);

module.exports = router;
