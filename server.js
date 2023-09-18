const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

const app = express();

// Importing local files
const USER = require("./Models/user");
const protected = require("./protected");
const sendNews = require("./functions/send_news");

// setting up mongoose
mongoose.set("strictQuery",false);
mongoose.connect(protected.mongoDB_atlas_url);

// Adding middlewares
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.set("view engine","ejs");

app.use(cookieParser());

// Adding routes as middlewares
app.use("/", require("./Routes/index"));
app.use("/users", require("./Routes/users"));

// Calling sendNews function
setInterval(async() => {
    console.log("Sending emails in 5 minutes.");
    await sendNews();
}, 5*60*1000);

app.listen(3000, (req,res)=> {
    console.log("Server is running at port 3000. Go to http://localhost:3000");
});