'use strict'
/* __________________ Order Router __________________ */
const router = require('express').Router()

const order = require('../controllers/order')
const {isAdmin,isLogin} = require('../middlewares/permissions')

// URL: /orders

router.route('/')
.get(isLogin, order.list)
.post(isLogin, order.create)

router.route("/:id")
.get(isLogin, order.read)
.put(isAdmin, order.update)
.patch(isAdmin, order.update)
.delete(isAdmin, order.delete)

/* _______________________ - _______________________ */
module.exports = router