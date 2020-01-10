const { logger } = require('./helper/logger');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config()

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})