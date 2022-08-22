const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const port = process.env.port || 3000;

const userRoutes = require("./routes/user")
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());

app.use("/user", userRoutes)


require("./config/database").connect();
app.listen(port, (e) => console.log(`app started on port ${port}`))