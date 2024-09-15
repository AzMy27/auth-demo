const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashAsync(
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
