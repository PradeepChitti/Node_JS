const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

// Using the ExpressJS
const app = express();

// Using the middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter.router);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// creating server & listening to the server
app.listen(3000);
