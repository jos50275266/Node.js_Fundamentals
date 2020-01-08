const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const morgan = require('morgan');
const mongoose = require('mongoose')
const express = require('express');
const app = express();

// Environment Variable이 설정됬는지 확인하기
// export vidly_jwtPrivateKey=mySecureKey
if (!config.get('jwtPrivateKey')) {
    console.error('Fatal Error: jwtPrivateKey is not defined');
    process.exit(1);
    // 0: success
    // 1: fail
}

// router
const users = require('./routes/users');
const auth = require('./routes/auth');
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

mongoose.connect('mongodb://localhost/movie_api', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/users', users)
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})