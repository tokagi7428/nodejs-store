const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// middleware
require("dotenv").config;

// mongoose
mongoose
  .connect("mongodb://localhost/productDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoose"))
  .catch((err) => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

// routes
app.use(express.static(path.join(__dirname, "public")));
const productRoutes = require("./routes/product.js");
app.use(productRoutes);

// ports
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
