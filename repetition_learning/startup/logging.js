const winston = require('winston')
const { logger } = require('../helper/logger')
require('express-async-errors')

module.exports = function () {
    process.on('uncaughtException', (ex) => {
        console.log('We GOT AN UNCAUGHT EXCEPTION');
        logger.error(ex);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        console.log('We GOT AN UNHANDLED REJECTION');
        logger.error(ex);
        process.exit(1);
    })

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly',
        level: 'info'
    });
}