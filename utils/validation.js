const Joi = require("joi");

const userSchema = Joi.object({

    email: Joi.string().email({ tlds: { allow: false }, minDomainSegments: 2, })
            .error(() =>  new Error("Invalid email.")),
    password: Joi.string().min(6).alphanum()
                .error(() => new Error("Password must be bigger than 6 characters and contain letters and numbers"))
// activate unknown to allow more fields on the body object
}).unknown(true);

const contactSchema = Joi.object({

        firstName:  Joi.string(),
        lastName: Joi.string(),
        phone: Joi.number().integer(),
        address: Joi.string()

})


exports.validateUser = (req, res, next) => {
    const { email, password } = req.body
    const { error } = userSchema.validate({email, password});
    if(error){
        res.status(400).send(`Validation error. ${error.message}`);
        throw error;
    }
    return next();
}

exports.validateContact = (req, res, next) => {
    const { firstName, lastName, phone, address } = req.body;
     const { error } = contactSchema.validate({ firstName, lastName, phone, address });
    if(error){
        res.status(400).send(`Incorrect input. ${error.message}`)
        throw new Error(error);
    }
    return next();
}