require('express-async-errors')
require('winston-mongodb');
const { logger } = require('./helper/logger');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/routes')(app);


process.on('uncaughtException', (ex) => {
  console.log('We GOT AN UNCAUGHT EXCEPTION');
  logger.error({ "uncaughtException": ex.message });
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  console.log('We GOT AN UNHANDLED REJECTION');
  logger.error(ex);
  process.exit(1);
})

// throw new Error('Hello World!')
// const p = Promise.reject(new Error('Something Failed miserably!'));
// p.then(() => console.log('Done')).catch();

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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));