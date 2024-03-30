'use strict'
/* __________________ Order Router __________________ */
const router = require('express').Router()

const order = require('../controllers/order')

// URL: /orders

router.route('/')
.get(order.list)
.post(order.create)

router.route("/:id")
.get(order.read)
.put(order.update)
.patch(order.update)
.delete(order.delete)

/* _______________________ - _______________________ */
module.exports = router