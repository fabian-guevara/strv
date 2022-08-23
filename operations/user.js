require("dotenv").config();

const User = require("../models/user");
const { db } = require("../config/firebase")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {  ref, push } = require("firebase/database");

const saltRounds = 12;
const { TOKEN_SECRET } = process.env;


exports.signup = async(email, password) => {
     try {
        // check if user exists
        const user = await User.findOne({ email });
        if(!user){
         //if user does not exist hash password 
         const hashedPassword = await bcrypt.hash(password, saltRounds);
         const newUser = new User({ email, password: hashedPassword})
         //saving new user to databse
         await newUser.save();
         return newUser;
        }else{
         throw new Error("Error while creating new user. Reason: Email already in use.");
        }
     } catch (error) {
        console.error(error)
     }
}

exports.login = async(email, password) => {
  try {
       //check if user exists on database
      const user = await User.findOne({ email });
      //compare hashed password to plain text passwod
      const correctPassword =  bcrypt.compare(password, user.password);
      if (user && correctPassword){
         const { _id, email } = user;
         //sign user with token
         const token = jwt.sign({ _id, email}, TOKEN_SECRET, { expiresIn: "30m" })
         user.token = token
         return user;
      } else {
         throw new Error("Authentication Error. Try again.")
      }
  } catch (error) {
   console.error(error.message)
  }
}

exports.createContact = async(document, contactObject) => {
   const { firstName, lastName, phone, address } = contactObject;
   return await push(ref(db, "contacts/" + document), {
      firstName, lastName, phone, address
   })
}