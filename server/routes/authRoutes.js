const express = require("express");
const router = express.Router();
const { login, refresh, logout } = require("../controller/authController");

router.post("/login", login);
router.get("/refresh", refresh);
router.get("/logout", logout);

module.exports = router;
