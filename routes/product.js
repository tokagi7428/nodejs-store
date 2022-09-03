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
  // check authentication by cookies
  // if (req.cookies.login) {
  //   const doc = await Product.find({});
  //   res.render("manage.ejs", { products: doc });
  // } else {
  //   res.render("404");
  // }
  // check authentication by session
  if (req.session.login) {
    const doc = await Product.find({});
    res.render("manage.ejs", { products: doc });
  } else {
    res.redirect("add-product");
  }
  // console.log("id Session = ", req.sessionID);
  // console.log("data of session : ", req.session);
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
  // if (req.cookies.login) {
  //   res.render("form.ejs");
  // } else {
  //   res.render("admin");
  // }
  if (req.session.login) {
    res.render("form.ejs");
  } else {
    res.render("admin");
  }
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

// cookie
productRoutes.post("/login", (req, res) => {
  const { username, password } = req.body;
  const timeExpire = 30000; // 10 sec
  if (username === "admin" && password === "123") {
    // make cookie
    // res.cookie("username", username, { maxAge: timeExpire });
    // res.cookie("password", password, { maxAge: timeExpire });
    // res.cookie("login", true, { maxAge: timeExpire }); // true => login success

    // make session
    req.session.username = username;
    req.session.password = password;
    req.session.login = true;
    req.session.cookie.maxAge = timeExpire;

    res.redirect("/manage");
  } else {
    res.render("404");
  }
});

productRoutes.get("/logout", (req, res) => {
  // logout clear cookie
  // res.clearCookie("username");
  // res.clearCookie("password");
  // res.clearCookie("login");
  // res.redirect("/manage");

  // logout clear session
  req.session.destroy((err) => {
    if (err) return console.log(err);
    res.redirect("/manage");
  });
});

module.exports = productRoutes;
