const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

// middleware
require("dotenv").config;
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    secret: "mySession",
    saveUninitialized: false,
  })
);

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

// routes
app.use(express.static(path.join(__dirname, "public")));
const productRoutes = require("./routes/product.js");
const userRoutes = require("./routes/user.js");
app.use(productRoutes);
app.use(userRoutes);

// ports
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
