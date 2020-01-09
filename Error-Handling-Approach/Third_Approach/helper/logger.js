const winston = require('winston');
const logger = winston.createLogger({
    defaultMeta: { service: 'user-service' },
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(
            { handleExceptions: true }
        ),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

module.exports.logger = logger