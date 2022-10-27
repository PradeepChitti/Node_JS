const path = require("path");

const express = require("express");

const adminRouter = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("shop.js", adminRouter.products);
  res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // Allows to send a response from the server
});

module.exports = router;
