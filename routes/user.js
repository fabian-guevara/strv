const express = require("express");
const userController = require("../controllers/user");
const { verifyToken } = require("../utils/token-verification");
const { validateUser, validateContact } = require("../utils/validation");

const router = express.Router();



router.post("/signup", validateUser, userController.signup, userController.login);

router.post("/login", validateUser, userController.login);

router.post("/add-contact", [verifyToken, validateContact],  userController.addContact);





module.exports = router;