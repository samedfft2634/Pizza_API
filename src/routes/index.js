'use strict'
/* ____________________ Routers ____________________ */
const router = require('express').Router()

// user:
router.use('/users',require('./user'))
// token:
router.use('/tokens',require('./token'))

/* _______________________ - _______________________ */
module.exports = router