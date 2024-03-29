"use strict";
/* _________________________________________________ */
/* MongoDb Connection                                */
/* _________________________________________________ */
const mongoose = require("mongoose");

const dbConnection = () => {
	mongoose
		.connect(process.env.MONGODB)
		.then(() => console.log("* DB Connected * "))
		.catch((err) => console.log("* DB Connection Failed * ", err));
};

module.exports = { mongoose, dbConnection };
