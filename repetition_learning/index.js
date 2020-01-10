require('express-async-errors');
const error = require('./middleware/error')
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

// routes
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth')

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'));
app.use(helmet());

// routes middlewares
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/rentals', rentals);
app.use('/api/auth', auth)

app.use(error);
const options = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}

mongoose.connect(process.env.mongodb_URL, options)
    .then(() => console.log(`Connected to MongoDB... ${process.env.mongodb_URL}`))
    .catch((err) => console.error('Could not connect to MongoDB...'));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})