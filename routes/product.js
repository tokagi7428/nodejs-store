const productRoutes = require("express").Router();
const Product = require("../models/product.js");

//upload file
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({
  storage: storage,
});

productRoutes.get("/", (req, res) => {
  Product.find().exec((err, doc) => {
    if (err) console.log(err);
    res.render("index", { products: doc });
  });
});
// manage Products
productRoutes.get("/manage", async (req, res) => {
  const doc = await Product.find({});
  res.render("manage.ejs", { products: doc });
});

// show product
productRoutes.get("/product/:id", (req, res) => {
  Product.findById(req.params.id).exec((err, doc) => {
    if (err) console.log(err);
    // console.log(doc);
    res.render("product.ejs", { product: doc });
  });
});

// add product
productRoutes.get("/add-product", (req, res) => {
  res.render("form.ejs");
});

// link => params
productRoutes.get("/delete/:id", (req, res) => {
  // console.log(req.params.id);
  Product.findByIdAndRemove(req.params.id, { useFindAndModify: false }).exec(
    (err) => {
      if (err) console.log(err);

      res.redirect("/manage");
    }
  );
});

// route add product to mongoDb
productRoutes.post("/insert", upload.single("image"), (req, res) => {
  // console.log(req.file);
  // save data to mongodb
  let newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    image: req.file.filename,
  });
  Product.saveProduct(newProduct, (err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
  // // let product = await newProduct.save();
  // // console.log(product);
  // res.redirect("/");
});
// route add product to mongoDb
productRoutes.post("/edit", (req, res) => {
  let edit_id = req.body.edit_id;
  Product.findById(edit_id).exec((err, product) => {
    if (err) console.log(err);
    res.render("edit-form", { product });
  });
});

productRoutes.post("/update-form", (req, res) => {
  const { update_id, name, price, desc } = req.body;
  Product.findByIdAndUpdate(
    update_id,
    { $set: req.body },
    { useFindAndModify: false },
    (err, data) => {
      if (err) console.log(err);
      res.redirect("/");
    }
  );
});

module.exports = productRoutes;
