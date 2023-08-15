const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/usersController");

const verifyJwt = require("../middleware/verifyJwt");
// multer.diskStorage: This is a function provided by multer that creates a new storage engine for handling file uploads.
// The storage engine is responsible for determining where and how to store the uploaded files.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(verifyJwt);

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", upload.single("image"), createUser);
router.patch("/:id", upload.single("image"), updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
