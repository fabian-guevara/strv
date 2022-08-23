const userOperations = require("../operations/user");

exports.signup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
    if (!email || !password) {
        return res.status(422).json({
            message: "Email and Password are required to create a new user."
        });
        
    } else {
        // create user
        const user = await userOperations.signup(email, password);
        if (user) {
            // if user was created successfully go to login.
            next();
        }else{
            return res.status(400).json({
                message: "User already exists"
            })
        }
    }
    } catch (error) {
        console.error(error)
    }
}

exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).send("Email and password required.");
        }
        const user = await userOperations.login(email, password);
        res.status(200).json({
            message: "User logged in",
            token: user.token
        })
        // next();
    }catch(error){
        console.error(error.message)
    }
}

exports.addContact = async (req, res, next) => {
    const { firstName, lastName, phone, address } = req.body;
    try {
        const documentName = req.decodedToken._id;
        const createdContact = await userOperations.createContact(documentName, { firstName, lastName, phone, address });
        if(createdContact){
            res.status(200).send("Contact successfully created")
        }
    } catch (error) {
        console.error(error.message)
    }
}