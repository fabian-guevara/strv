require("dotenv").config();

const User = require("../models/user");
const { db } = require("../config/firebase")

const bcrypt = require("bcrypt");
const logger = require("pino")();
const jwt = require("jsonwebtoken");

const saltRounds = 12;
const { TOKEN_SECRET } = process.env;


exports.signup = async(email, password) => {
     try {
        // check if user exists
        const user = await User.findOne({ email });
        if(!user){
         const hashedPassword = await bcrypt.hash(password, saltRounds);
         const newUser = new User({ email, password: hashedPassword})
         await newUser.save();
         return newUser;
        }else{
           return logger.info({err: new Error("Email already in use")});
        }
        
     } catch (error) {
        logger.error(error)
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