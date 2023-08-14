const express = require("express");
const router = express.Router();
const { createProduct, getProducts } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");


router.post("/",protect,upload.single("image"),createProduct);
router.get("/getproducts",protect,getProducts);

module.exports = router;