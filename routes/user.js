const User = require("../models/User.js");
const routes = require("express").Router();

// signup form
routes.get("/signup-form", async (req, res) => {
  res.render("signup", { error: "" });
});

// signup
routes.post("/signup", async (req, res) => {
  const { username, password, address } = req.body;
  const user = await User.findOne({ username: username });
  // console.log(user);
  if (!user) {
    let newUser = new User({
      username: username,
      password: password,
      address: address,
    });
    await newUser.save();
    res.redirect("/signin-form");
  } else {
    res.render("signup", {
      error: '<span class="text-danger">Username has registed!!</span>',
    });
  }
});

// signin
routes.post("/signin", async (req, res) => {
  const { username, password, address } = req.body;
  const user = await User.findOne({ username: username });
  // console.log({ user });
  const timeExpire = 300000; // 10 sec
  if (user && user.password === password) {
    req.session.username = user.username;
    req.session.password = user.password;
    req.session.user = true;
    req.session.cookie.maxAge = timeExpire;

    res.redirect("/");
  } else {
    res.render("signin", {
      error:
        '<span class="text-danger">Username or password is not correct!!</span>',
    });
  }
});

// signin form
routes.get("/signin-form", async (req, res) => {
  res.render("signin", { error: "" });
});

module.exports = routes;
