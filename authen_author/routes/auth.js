const jwt = require('jsonwebtoken');
const Joi = require("@hapi/joi")
const { User, validateUser } = require("../models/user")
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()

router.post('/', async (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    // Bcrypt가 salt를 제거하고 rehash 한다.
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // Instead of true value, we send JWT(JSON Web Token)
    // Web ex) localstorage: Header, Payload(userID, name, admin: true/false) will be public property,
    // so we should not include private or important data there, such as password
    // Verify Signature: Based on the content of the JSON web token along with the secret or private key
    // , which is only available on server
    // Header + Payload 를 암호화 한 것을 Verify Signature에 저장하는데 이때, JWT는 secret or private key
    // 가 필요한데 이것은 서버만 알고있기 때문에 해킹이 불가능하다.
    // res.send(true);

    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey'); // (payload, secret or private key)
    res.send(token);
})

async function validateAuth(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return schema.validate(req)
}

module.exports = router