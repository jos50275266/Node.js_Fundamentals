const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = require('router');

router.post('/', async (req, res) => {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findone({ email: req.body.email });
    if (!user) return res.statsu(404).send('Invalid Email or Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or password!');

    const token = user.generateAuthToken();
    res.send(token);
})

async function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return schema.validate(req)
}
module.exports = router