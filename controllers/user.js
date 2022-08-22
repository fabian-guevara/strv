const userOperations = require("../operations/user");

exports.signup = async(req, res, next) => {
    const { email, password } = req.body;
    try{
    if(!email || !password){
        return res.status(422).json({
            message: "Email and Password are required to signup"
        });
        
    }else{
        const user = await userOperations.signup(email, password);
        if(user){
            const loggedInUser = await userOperations.login(email, password);
            return res.status(200).json({
                message: "User created and logged in.",
                token: loggedInUser.token
            })
        }
    }
    }catch(error){
        console.error(error)
    }
}

exports.login = async(req, res) => {
    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).send("Email and password required.")
        }
        const user = await userOperations.login(email, password);
        return res.status(200).json({
            message: "User logged in",
            token: user.token
        })
    }catch(error){
        console.error(error.message)
    }
}

exports.addContact = async(req, res, next) => {
    const { firstName, lastName, phone, address } = req.body;
    try {
        const createdContact = await userOperations.createContact({ firstName, lastName, phone, address });
        if(createdContact){
            res.status(200).send("Contact Successfully created")
        }
    } catch (error) {
        console.error(error.message)
    }
}