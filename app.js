const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {});

app.use((req, res, next) => {
    User.findById("64569abf103a50b0e1278c57").then((user) => {
        req.user = user;
        next();
    });
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
app.use("/admin", adminRoutes);
app.use(shopRoutes);



app.use(errorController.get404);

mongoose
    .connect(
        "mongodb+srv://abhishekk:abhishek@cluster0.yzw8ett.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: "Abhi",
                    email: "abhi67562@gmail.com",
                    cart: {
                        items: [],
                    },
                });
                user.save();
            }
        })
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });