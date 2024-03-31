"use strict";
/* _________________________________________________ */
/* Authentication Controller                         */
/* _________________________________________________ */
const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require('jsonwebtoken')
/* _________________________________________________ */

module.exports = {
	login: async (req, res) => {
		/*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */
		const { username, email, password } = req.body;

		if ((username || email) && password) {

			const user = await User.findOne({ $or: [{ username }, { email }] });

			if (user && user.password == passwordEncrypt(password)) {

                if(user.isActive){
                    
                    /* SIMPLE TOKEN */
					let tokenData = await Token.findOne({ userId: user.id });

					if (!tokenData)
						tokenData = await Token.create({
							userId: user.id,
							token: passwordEncrypt(user.id + Date.now()),
						});
                    /* SIMPLE TOKEN */

                    /* JWT */
                    const {username,email,password,isActive,isAdmin} = user
                    const accessInfo = {
                            key:process.env.ACCESS_KEY,
                            time:'30m',
                            data:{
                                id:user.id, 
                                username,
                                email,
                                password,
                                isActive,
                                isAdmin
                            },
                        }

                        const refreshInfo ={
                            key:process.env.REFRESH_KEY,
                            time:'3d',
                            data:{
                                id:user.id,
                                password:user.password
                            },

                        }

                        const accessToken = jwt.sign(accessInfo.data,accessInfo.key,{expiresIn:accessInfo.time})
                        const refreshToken = jwt.sing(refreshInfo.data,refreshInfo.key,{expiresIn:refreshInfo.time})
                    /* JWT */


                    res.status(200).send({
                        error:false,
                        token:tokenData.token,
                        user
                    })
                } else {
                    res.errorStatusCode = 401;
					throw new Error("This account is not active.");
                }

			} else {
				res.errorStatusCode = 401;
				throw new Error("Wrong username/email or password.");
			}

		} else {
			res.errorStatusCode = 401;
			throw new Error("Please enter username/email and password.");
		}
	},
	logout: async (req, res) => {
		/*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */
            const auth = req.headers?.authorization; 
            const tokenKey = auth ? auth.split(" ") : null; 
    
            if (tokenKey[0] == "Token") {
                const result = await Token.deleteOne({ token: tokenKey[1] });
                res.send({
                    error: false,
                    message: "Token deleted. Logout was OK.",
                    result,
                });
            } else { // for JWT
                res.send({
                    error: false,
                    message: "JWT: No need any process for logout.",
                });
            }
	},
};
