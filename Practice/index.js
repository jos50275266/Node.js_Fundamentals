const morgan = require('morgan');
const express = require('express');
const { logger, stream } = require("./utils/testlogger")
const app = express();

app.use(morgan('combined', { stream }))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/home', (req, res) => {
    res.send('Hello from home endpoint!');
});

app.get('/user', (req, res) => {
    res.send('Hello from user endpoint!');
});

app.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT}`);
});