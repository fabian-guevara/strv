"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());

app.use("/user", userRoutes)


require("./config/database").connect();

app.listen(port, error => {
	if (error) {
		console.error(error.message);
	} else {
		console.log("App started on port", port);
	}
})