const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/usersController");

router.get("/", getUsers);
router.post("/", createUser);
router.patch("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
