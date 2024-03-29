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

app.use(require('./src/middlewares/queryHandler'))

/* _____________________ Routes ____________________ */
app.use('/', require('./src/routes/'))

app.all('/',(req,res)=>{
    res.send({
        error:false,
        message:'Welcome to Pizza API',
        docs:{
            swagger:"/documents/swagger",
            redoc:"/documents/redoc",
            json:'/documents/json',
        },
        user:req.user
    })
})
/* _______________________________________________ */

app.use(require('./src/middlewares/errorHandler'))

app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* _______________________________________________ */
// require('./src/helpers/sync')() // !!! It clears database. It must be in comment line.
