'use strict'
/* ____________________ Routers ____________________ */
const router = require('express').Router()

// user:
router.use('/users',require('./user'))

/* _______________________ - _______________________ */
module.exports = router