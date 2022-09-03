const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    name: { type: String, require },
    price: { type: Number, require },
    image: { type: String, require },
    desc: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productModel);
module.exports = Product;
module.exports.saveProduct = function (model, data) {
  model.save(data);
};
