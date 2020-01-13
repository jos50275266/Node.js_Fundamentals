const morgan = require('morgan');
const express = require('express');
const { logger, stream } = require("./utils/logger")
const app = express();

require('./startup/logging');
app.use(morgan('combined', { stream }))



