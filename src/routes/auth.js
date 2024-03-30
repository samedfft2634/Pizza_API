'use strict'
/* _____________ Authentication Router _____________ */
const router = require('express').Router()
/* Login User req.body example *
{
  "username":"Pizza User 1",
  "password":"Pizza123*"
}
/* _______________________ - _______________________ */

// routes/auth
const auth = require('../controllers/auth')

// URL: /auth
router.post('/login',auth.login)
router.get('/logout',auth.logout)
/* _______________________ - _______________________ */
module.exports = router