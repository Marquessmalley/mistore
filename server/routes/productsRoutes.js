const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController");

// multer.diskStorage: This is a function provided by multer that creates a new storage engine for handling file uploads.
// The storage engine is responsible for determining where and how to store the uploaded files.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, file.fieldname + "-" + fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", upload.array("images"), createProduct);
router.patch("/:id", upload.array("images"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
