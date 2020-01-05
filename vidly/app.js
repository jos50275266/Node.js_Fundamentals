const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const genres = require('./routes/genres')
const app = express();

mongoose
    .connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.use('/api/genres', genres);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))