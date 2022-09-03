// create server without library

const http = require("http");
const dotenv = require("dotenv");
const fs = require("fs");

const indexPage = fs.readFileSync(`${__dirname}/pages/index.html`);
const productPage1 = fs.readFileSync(`${__dirname}/pages/product1.html`);
const productPage2 = fs.readFileSync(`${__dirname}/pages/product2.html`);
const productPage3 = fs.readFileSync(`${__dirname}/pages/product3.html`);
// const indexPage = fs.readFileSync("pages/index.html", "utf-8")

dotenv.config();

const server = http.createServer((req, res) => {
  const myHtm = `
        <h1>Hello World</h1>
        <p>Node.Js and Javascript</p>
    `;
  const url = req.url;
  if (url === "/" || url === "/index.html") {
    res.write(indexPage);
  } else if (url === "/product1.html") {
    res.write(productPage1);
  } else if (url === "/product2.html") {
    res.write(productPage2);
  } else if (url === "/product3.html") {
    res.write(productPage3);
  } else {
    res.writeHead(404).write("<h1>Not found</h1>");
  }
  res.end();
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
