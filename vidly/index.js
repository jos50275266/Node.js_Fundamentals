const express = require('express');
const mongoose = require('mongoose');
const su = require("./routes/su");
const app = express();

mongoose.connect('mongodb://localhost/su', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecting to Database...'))
    .catch((err) => console.error('Could not connect to Database', err))

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/su', su);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})