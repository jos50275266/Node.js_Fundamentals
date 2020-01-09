require('express-async-errors')
const winston = require('winston')
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

// Uncaught Exceptions을 잡는법 - 대신에 이 코드는 오직 synchronous code 에서만 적용가능
process.on('uncaughtException', (ex) => {
    console.log('We GOT AN UNCAUGHT EXCEPTION');
    logger.error({ 'uncaught exception': ex.message });
    process.exit(1); // 0: success
});

// 위 코드 대신에 - 하지만 개인적으로 위 방식을 선호한다. handleExceptions 오직 uncaughtException 만 처리, 하지만 트릭으로 가능
winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtException.log' }))
// winston이 unhandledRejection을 인식하지 못하기 때문에 인식하게 만들려면 아래와 같이 트릭을 사용한다
process.on('unhandledRejection', ex => {
    throw ex;
})

// process.on('unhandledRejection', (ex) => {
//   console.log('We GOT AN UNHANDLED REJECTION');
//   logger.error({ 'unhandled rejection': ex.message });
//   process.exit(1);
// })

// Add another transport
// winston.add(new winston.transports.File({ filename: 'logfile.log' }))
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }))
// DB에 log 라는 collection에 오류가 document로 저장됨.
// https://codesquery.com/nodejs-logging-tutorial/

// 아래 에러는 Express 및 winston이 잡아내지 못하는 에러다, uncaught exceptions
// 이러한 경우 server에 콘솔 찍지않는이상 어떤 문제인지 알 수 없다. 이 문제를 해결하기위해
// process object의 eventEmitter를 이용한다.

// throw new Error('Something Failed During Startup.'); Synchronous Error
const p = Promise.reject(new Error('Something Failed miserably!'));

p.then(() => console.log('Done')).catch(); // Unhandled promise project does not terminate process,
// but in the future, promise rejection that are not handled will termninate Node.js process


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const options = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}

mongoose.connect('mongodb://localhost/vidly', options)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));