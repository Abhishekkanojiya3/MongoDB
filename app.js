const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
    User.findById("64560ca642e9b41d9dab5d22").then((user) => {
        req.user = user;
        next();
    });
});

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});