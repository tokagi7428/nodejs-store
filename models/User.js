const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: { type: String, require },
  password: { type: String, require },
  address: { type: String, require },
});

const User = mongoose.model("User", userModel);
module.exports = User;
