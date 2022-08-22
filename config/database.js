const mongoose = require("mongoose");
require("dotenv").config();
const {MONGO_URI} = process.env;

exports.connect = () => {
  // Database connection
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("Database connected");
    }).catch((error) => {
      console.log("Connection Failed");
      console.error(error);
    });
};