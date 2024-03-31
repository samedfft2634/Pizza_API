"use strict";
/* _________________ Authentication ________________ */
const Token = require("../models/token");
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization
    const tokenKey = auth ? auth.split(' ') : null

    if(tokenKey && tokenKey[0] == 'Token'){

        const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId')
        req.user = tokenData ? tokenData.userId : false

    } else if (tokenKey[0] == 'Bearer'){

        jwt.verify(tokenKey[1],process.env.ACCESS_KEY,function(err, accessData){
            if(accessData){
                console.log("JWT Verify: Yes")
                req.user= accessData
            } else{
                req.user= false
                console.log("JWT Verify: No",err)
            }
        })

    }
    next();
};
