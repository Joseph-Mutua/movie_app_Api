const express = require("express");
const router = express.Router();

/* GET movie page */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Homepage" });
});

module.exports= router;