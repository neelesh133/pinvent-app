const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser")
const path = require('path')

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//ROUTES
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//Error Middleware
app.use(errorHandler);

//Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
