const { logger } = require('../helper/logger');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

module.exports = function () {
    const options = {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    }

    mongoose.connect(process.env.mongodb_URL, options)
        .then(() => logger.info('Connected to MongoDB...'))
        .catch(err => logger.error('Could not connect to MongoDB...'));
}