const validate = require('../middleware/validate');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();

// auth를 먼저해서 user에 담아두고 그 후 admin이 req.user의 정보를 가지게 된다.
router.get('/me', [auth, admin], async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
})

router.post('/', validate(validateUser), async (req, res) => {
    // const { error } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;