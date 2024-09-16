const express = require("express");
const router = express();

// const auth = (req, res, next) => {
//   if (!req.session.user_id) {
//     return res.redirect("/login");
//   }
//   next();
// };

router.get(
  "/",
  /*auth,*/ (req, res) => {
    //   if (!req.session.user_id) {
    //     res.redirect("/login");
    //   }
    res.render("admin");
  }
);

module.exports = router;
