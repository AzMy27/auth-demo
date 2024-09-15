const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send(
    "Hanya admin yang dapat mengakses halaman ini"
  );
});

module.exports = router;
