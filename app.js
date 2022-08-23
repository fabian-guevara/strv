"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());

require("./config/database").connect();

app.get("/", (req, res) => {
	res.send("Hello")
})
app.use("/user", userRoutes)

app.use((err, req, res, next) => {
	res.status(400).json(err);
	next();
});

app.all('*', (req, res) => {
    res.status(501).json({
      message: 'No such endpoint'
    });
  });


app.listen(PORT, error => {
	if (error) {
		console.error(error.message);
	} else {
		console.log("App started on PORT", PORT);
	}
})

