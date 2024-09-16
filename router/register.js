const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(
    password,
    10
  );
  const user = new User({
    username,
    password: hashedPassword,
  });
  await user.save();
  res.redirect("/");
});

module.exports = router;
