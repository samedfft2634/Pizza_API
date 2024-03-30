'use strict'
/* __________________ token Router __________________ */
const router = require('express').Router()

const token = require('../controllers/token')

// URL: /tokens

router.route('/')
.get(token.list)
.post(token.create)

router.route("/:id")
.get(token.read)
.put(token.update)
.patch(token.update)
.delete(token.delete)

/* _______________________ - _______________________ */
module.exports = router