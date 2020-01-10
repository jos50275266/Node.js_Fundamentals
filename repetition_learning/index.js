const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'));
app.use(helmet());

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