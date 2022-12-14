const mongoose = require("mongoose");
require("dotenv").config();
const {MONGO_URI} = process.env;

exports.connect = () => {
  // Database connection
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("Atlas DB connection established");
    }).catch((error) => {
      console.log("Atlas DB connection Failed");
      console.error(error);
    });
};