'use strict'
/* __________________ Pizza Router __________________ */
const router = require('express').Router()

const pizza = require('../controllers/pizza')
const {isAdmin} = require('../middlewares/permissions')

// URL: /pizzas

router.route('/')
.get(pizza.list)
.post(isAdmin,pizza.create)

router.route("/:id")
.get(pizza.read)
.put(isAdmin,pizza.update)
.patch(isAdmin,pizza.update)
.delete(isAdmin,pizza.delete)

/* _______________________ - _______________________ */
module.exports = router