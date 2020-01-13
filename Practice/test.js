const morgan = require('morgan');
const express = require('express');
const { logger, stream } = require("./utils/logger")
const app = express();

require('./startup/logging');
app.use(morgan('combined', { stream }))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT}`);
});

logger.error('This is Error...');
logger.warn('This is Warn...');
logger.info('This is Info...');
logger.verbose('This is Verbose...');
logger.debug('This is debug...');
logger.silly('This is silly...');


function getUser() {
    return new Promise((resolve, reject) => {
        reject('Hello World!')
    })
}

getUser()
    .then()
    .catch(err => {
        logger.error(err)
    })

// throw new Error('dadas')
// const a = new Promise((resolve, reject) => {
//     reject('Hello World!')
// });

// a.then().catch()


