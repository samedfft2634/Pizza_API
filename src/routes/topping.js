'use strict'
/* __________________ Topping Router __________________ */
const router = require('express').Router()

const topping = require('../controllers/topping')
const {isAdmin} = require('../middlewares/permissions')

// URL: /toppings

router.use(isAdmin)

router.route('/')
.get(topping.list)
.post(topping.create)

router.route("/:id")
.get(topping.read)
.put(topping.update)
.patch(topping.update)
.delete(topping.delete)

/* _______________________ - _______________________ */
module.exports = router