const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByCredentials(
    username,
    password
  );
  if (user) {
    req.session.user_id = user._id;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
