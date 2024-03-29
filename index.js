'use strict'
const express = require('express')
const app = express()
/* _______________________________________________ */

require('dotenv').config()
const PORT = process.env.PORT || 8000;
require('express-async-errors')

/* _________________ Connect DB _________________ */

const {dbConnection} = require('./src/configs/dbConnection')
dbConnection()

/* __________________ Middlewares __________________ */
app.use(express.json())

app.use(require('./src/middlewares/logger'))

