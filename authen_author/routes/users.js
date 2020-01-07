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

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // 위 코드와 동일
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.save();

    // 문제점 1: user에게 비밀번호를 send 해주면 안됨.
    // 첫번째 해결법
    // res.send({
    //     name: user.name,
    //     email: user.email
    // })

    // 두번째 해결법, Lodash 사용
    // second property 배열에 원하는 property 이름만
    // _.pick(user, ['name', 'email'])
    // joi-password-complexity

    res.send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router

// /api/users