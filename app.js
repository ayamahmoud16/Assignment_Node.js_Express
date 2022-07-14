const express = require("express");

const debug = require("debug")("app");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const productRouter = require("./src/routes/productRouter");
const adminRouter = require("./src/routes/adminRouter");
const authRouter = require("./src/routes/authRouter");

app.use(express.static(path.join(__dirname, "/public/")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "Store" }));
app.use(passport.initialize());
app.use(passport.session());
require("./src/config/passport.js")(app);
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "hello", data: ["a", "b", "c"] });
});

app.get("/home", (req, res) => {
  res.render("index", { title: "hello", data: ["a", "b", "c"] });
});
app.listen(3000),
  () => {
    debug(`end`);
  };

// var express = require("express");
// var app = express();

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("Example app listening at http://%s:%s", host, port);
// });
