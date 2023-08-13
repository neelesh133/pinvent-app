const expressAsyncHandler = require("express-async-handler");

const createProduct = expressAsyncHandler(async(req,res) =>{
    res.send("hello")
});

module.exports = {createProduct}