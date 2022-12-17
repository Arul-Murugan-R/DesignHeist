const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const data = require("./data");

const app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public",path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("home",{
		data:data,
		path:req.originalUrl,
		title:'Home Page'
	});
});

app.get("/view", (req, res) => {
	res.render("view", {
		data:data,
		path:req.originalUrl,
		title:'View Page'
	});
});
app.use("/movies", (req, res) => {
	res.render("movies", {
		data:data,
		path:req.originalUrl,
		title:'Movies Page'
	});
});
app.use("/video", (req, res) => {
	res.render("video", {
		data:data,
		path:req.originalUrl,
		title:'Video Player'
	});
});

app.listen(process.env.PORT||3000, () => {
	console.log("Listening at http://localhost:3000");
});
