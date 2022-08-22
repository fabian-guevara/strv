require("dotenv").config();

const jwt = require("jsonwebtoken");

const { TOKEN_SECRET }  = process.env;

exports.verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];
    if(!token){
        return res.status(401).json({
            message: "User not authenticated."
        })
    }
    token = token.split(" ")[1];
    try {
        const decoded =  jwt.verify(token, TOKEN_SECRET);
        req.decodedToken = decoded;
        return next();
    } catch (error) {
        console.error(error.message)
    }

}