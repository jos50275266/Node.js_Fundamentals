const { logger } = require('../utils/logger');
const mongoose = require('mongoose');

module.exports = function () {
    const options = {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    }

    mongoose.connect(process.env.mongodb_URL, options)
        .then(() => logger.info(`Connected to ${process.env.mongodb_URL}...`))
        .catch((err) => logger.error('Could not connect to MongoDB...'));
}

