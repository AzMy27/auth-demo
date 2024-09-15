const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1/auth_demo")
  .then((result) => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("Homepage");
});

app.use(express.urlencoded({ extended: true }));

// app.use(
//   "/register",
//   require("./router/register")
// );

// app.use("/admin", require("./router/admin"));

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
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

app.get("/admin", (req, res) => {
  res.send(
    "Hanya admin yang dapat mengakses halaman ini"
  );
});

app.listen(port, () => {
  console.log(
    `App listening on port http://localhost:${port} `
  );
});
