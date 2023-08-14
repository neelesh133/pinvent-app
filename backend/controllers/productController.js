const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { upload, fileSizeFormatter } = require("../utils/fileUpload");
Product;
const cloudinary = require("cloudinary").v2;

const createProduct = expressAsyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  //Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //Handle image upload
  let fileData = {};
  if (req.file) {
    //Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
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
    image: fileData,
  });

  res.status(201).json(product);
});

//Get all Products
// const getProducts = asyncHandler(async (req, res) => {});
module.exports = { createProduct };
