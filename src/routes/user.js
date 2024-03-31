'use strict'
/* __________________ User Router __________________ */
const router = require('express').Router()
const user = require('../controllers/user')
const {isAdmin,isLogin} = require('../middlewares/permissions')

// URL: /users

router.route('/')
.get(isAdmin,user.list)
.post(user.create)

router.route("/:id")
.get(isLogin,user.read)
.put(isLogin,user.update)
.patch(isLogin,user.update)
.delete(isAdmin,user.delete)

/* _______________________ - _______________________ */
module.exports = router