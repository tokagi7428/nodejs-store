const productRoutes = require("express").Router();

productRoutes.get("/", (req, res) => {
  const name = "Guidsdfse";
  const address = "<h3>My address</h3>";
  const products = ["shirt", "pants", "shocks"];
  const products1 = [
    {
      name: "shirt",
      price: 99,
      image:
        "https://cdn.pixabay.com/photo/2012/04/14/16/20/t-shirt-34481__340.png",
    },
    {
      name: "shirt",
      price: 99,
      image:
        "https://cdn.pixabay.com/photo/2014/04/03/10/55/t-shirt-311732__340.png",
    },
  ];

  res.render("test.ejs", { name, age: 12, address, products, products1 });
});

productRoutes.get("/manage", (req, res) => {
  res.render("manage.ejs");
});

productRoutes.get("/product", (req, res) => {
  res.render("product.ejs");
});

module.exports = productRoutes;

// const indexPage = path.join(__dirname, "../pages/index.html");

// productRoutes.get("/", (req, res) => {
//   res.status(200).type("text/html");
//   res.sendFile(indexPage);
// });

// productRoutes.get("/product/:id", (req, res) => {
//   //   const { id } = req.query;
//   //   res.sendFile(path.join(__dirname, `../pages/product${id}.html`));
//   const productID = req.params.id;
//   if (productID === "1") {
//     res.sendFile(path.join(__dirname, `../pages/product1.html`));
//   } else if (productID === "2") {
//     res.sendFile(path.join(__dirname, `../pages/product2.html`));
//   } else if (productID === "3") {
//     res.sendFile(path.join(__dirname, `../pages/product3.html`));
//   } else {
//     // res.status(404);
//     // res.send("<h1>404 Page Not Found</h1>");
//     res.redirect("/");
//   }
// });
