// use url for query product page

// create server without library

const http = require("http");
const dotenv = require("dotenv");
const fs = require("fs");
const url = require("url");

const indexPage = fs.readFileSync(`${__dirname}/pages/index.html`, "utf-8");
const productPage1 = fs.readFileSync(
  `${__dirname}/pages/product1.html`,
  "utf-8"
);
const productPage2 = fs.readFileSync(
  `${__dirname}/pages/product2.html`,
  "utf-8"
);
const productPage3 = fs.readFileSync(
  `${__dirname}/pages/product3.html`,
  "utf-8"
);

dotenv.config();

const server = http.createServer((req, res) => {
  // console.log(url.parse(req.url, true));
  const { pathname, query } = url.parse(req.url, true);
  // const pathName = req.url;
  if (pathname === "/" || pathname === "/home") {
    res.end(indexPage);
  } else if (pathname === "/product") {
    // console.log(query.id);
    if (query.id === "1") {
      res.end(productPage1);
    } else if (query.id === "2") {
      res.end(productPage2);
    } else if (query.id === "3") {
      res.end(productPage3);
    }
    // res.write(productPage1);
  } else {
    res.writeHead(404).end("<h1>Not found</h1>");
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
