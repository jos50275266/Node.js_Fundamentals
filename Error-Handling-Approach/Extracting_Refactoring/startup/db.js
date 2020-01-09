const { logger } = require("../helper/logger")
const mongoose = require('mongoose');

module.exports = function () {
    const options = {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    }

    mongoose.connect('mongodb://localhost/vidly', options)
        .then(() => logger.info('Connected to MongoDB...'))
        .catch(err => logger.error('Could not connect to MongoDB...'));
}