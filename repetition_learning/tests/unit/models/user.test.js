const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

describe('user.generateAuthToken', () => {
    it('should return JWT Token', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        expect(decoded).toMatchObject(payload)
    })

})