const _ = require('lodash')
const { User, validateUser } = require("../models/user")
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const { error } = await validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // later we're going to reset this value, so we use let
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');


    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.save();



    res.send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router

// /api/users