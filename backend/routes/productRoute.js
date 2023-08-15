const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");


router.post("/",protect,upload.single("image"),createProduct);
router.get("/getproducts",protect,getProducts);
router.get("/getproduct/:id",protect,getProduct);
router.delete("/deleteproduct/:id",protect,deleteProduct);
router.patch("/updateproduct/:id",upload.single("image"),protect,updateProduct);

module.exports = router;