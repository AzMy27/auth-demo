const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
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
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "notasecret",
    resave: false,
    saveUninitialized: false,
  })
);

const auth = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

// const authLog = (req, res, next) => {
//   if (!req.session.user_id) {
//     next();
//   }
//   return res.redirect("/admin");
// };

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use(
  "/register",
  require("./router/register")
);
app.use("/login", require("./router/login"));
app.use(
  "/admin",
  auth,
  require("./router/admin")
);
app.use(
  "/profile/settings",
  auth,
  require("./router/profile")
);
app.use(
  "/logout",
  auth,
  require("./router/logout")
);

app.listen(port, () => {
  console.log(
    `App listening on port http://localhost:${port} `
  );
});
