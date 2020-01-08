const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    }
})

// Arror Function은 this가 없기 때문에 여기 사용불가
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));

    return token
}

const User = mongoose.model('User', userSchema)

async function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required()
    })

    return schema.validate(user)
}

module.exports.User = User;
module.exports.validateUser = validateUser;