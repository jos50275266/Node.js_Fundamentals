const { logger } = require('../helper/logger')

module.exports = function (err, req, res, next) {
    // Log the exception - winston
    logger.error(err.message);
    // winston.error(err.message, err); // We can store metadata (second parameter)
    // error
    // warn
    // info (like connecting to mongoDB)
    // verbose
    // debug
    // silly  

    res.status(500).send('Something Failed.');
}

