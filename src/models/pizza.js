"use strict";
/* _________________ Pizza Model _________________ */
const { mongoose } = require("../configs/dbConnection");

const PizzaSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},

		images: {
			type: [String],
			// this line must be closed in manueal loading systems
			// validate:{
			//     validator:(value)=> value.every(url=> /^(http|https):\/\/\w+\.\w+([^\s*]+\/?)+$/.test(url)),
			//     message: 'Invalid image URL. Please provide a valid URL for each image.'
			// }
		},

		price: {
			type: Number,
			// required: true,
			default: 100,
		},

        // [ Many to many with array ]
		toppingIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Topping",
			},
		],
	},
	{
		collection: "pizzas",
		timestamps: true,
	}
);
module.exports = mongoose.model("Pizza", PizzaSchema);
