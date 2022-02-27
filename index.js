const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const data = require("./data");

const app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("home",{data});
});

app.get("/view", (req, res) => {
	res.render("view", { data });
});

app.listen(3000, () => {
	console.log("Listening at 3000");
});
