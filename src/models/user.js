"use strict";
/* ___________________ User Model __________________ */
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* _______________________ - _______________________ *
{   req.body example for create user!
    "username":"Pizza User 1",
    "password":"Pizza123*",
    "email":"user1pizza@test.com"
  }
/* _______________________ - _______________________ */
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
            set: (password) => {
                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
                    return passwordEncrypt(password)
                } else {
                    throw new Error('Password type is not correct.')
                }
            },
            // example password aZ123456*
		},
        email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
            validate: [
                (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
                'Email type is not correct.'
            ]
		},
        isActive:{
            type:Boolean,
            default:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
	},
	{
		collection: "users",
		timestamps: true,
	}
);
module.exports = mongoose.model("User", UserSchema);
