"use strict";
/* ____________________ Routers ____________________ */
const router = require("express").Router();

// auth:
router.use("/auth", require("./auth"));
// user:
router.use("/users", require("./user"));
// token:
router.use("/tokens", require("./token"));

// order:
router.use("/orders", require("./order"));
// pizza:
router.use("/pizzas", require("./pizza"));
// topping:
router.use("/toppings", require("./topping"));
/* _______________________ - _______________________ */
module.exports = router;
