const express = require("express");
const router = express();

router.post("/", (req, res) => {
  //   req.session.user_id = null;
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
