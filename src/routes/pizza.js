'use strict'
/* __________________ Pizza Router __________________ */
const router = require('express').Router()

const pizza = require('../controllers/pizza')

// URL: /pizzas

router.route('/')
.get(pizza.list)
.post(pizza.create)

router.route("/:id")
.get(pizza.read)
.put(pizza.update)
.patch(pizza.update)
.delete(pizza.delete)

/* _______________________ - _______________________ */
module.exports = router