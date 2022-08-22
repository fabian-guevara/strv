const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const {verifyToken} = require("../utils/token-verification");
const {validateUser, validateContact} = require("../utils/validation");


router.post("/signup", validateUser, userController.signup);

router.post("/login", validateUser, userController.login);

router.post("/add-contact", [verifyToken, validateContact],  userController.addContact);





module.exports = router;