const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { upload, fileSizeFormatter } = require("../utils/fileUpload");
Product;

const createProduct = expressAsyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  //Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //Handle image upload
  let fileData = {}
  if(req.file) {
    fileData = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  //create product
  const product = await Product.create({
    user: req.user._id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData
  });

  res.status(201).json(product)
});

module.exports = { createProduct };
