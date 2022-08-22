require("dotenv").config();

const User = require("../models/user");
const { db } = require("../config/firebase")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const user = await User.findOne({ email });
    const correctPassword =  bcrypt.compare(password, user.password);
    if(user && correctPassword){
      const { _id, email } = user;
      const token = jwt.sign({ _id, email}, TOKEN_SECRET, { expiresIn: "30m" })
      user.token = token
      return user;
    }else{
      throw new Error("Authentication Error. Try again.")
    }
}

exports.createContact = async(document, contactObject) => {
   const contactCollection = db.collection("contacts")
   return await contactCollection.doc(document).set({contactObject});
}