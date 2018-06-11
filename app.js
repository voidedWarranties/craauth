var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require("body-parser");

var book = require("./routes/book");
var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": "false"}));
app.set("view engine", "ejs");

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")));
} else {
    app.get("/", function(req, res) {
        res.send("Express Backend - Development");
    });
}

app.use("/api/book", book);

app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err: {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;