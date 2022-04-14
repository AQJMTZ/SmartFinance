const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{type: String, require: true},
    lastName: {type: String, require: true},
    email: { type: String, require: true},
    passwrord: { type: String, require: true},
    confirmPassword: { type: String, require: true}

});

const jwt = require('jsonwebtoken');
userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this_id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
};

const joi = require('joi');
const passwrordComplecity = require('joi-password-complexity');
const User = mongoose.model("user", userSchema);


const validate = (data) => {
    const Schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email : joi.string().email().required().label("Email"),
        passwrord: passwrordComplecity().required().label("Password")
    });
    return Schema.validate(data)
};

module.exports = {
    User,
    validate
}