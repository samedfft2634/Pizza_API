"use strict";
/* ____________ Mail sending ____________ */
// sendMail(to, subject, message)
const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_KEY,
			pass: process.env.MAILPASS_KEY,
		},
	});

	transporter.sendMail(
		{
			to,    
			subject,                
			text: message,          
			html:message, 
		},
		(err, success) => {
			success
				? console.log("SUCCESS", success)
				: console.log("ERROR", err);
		}
	);
};


/* ______________________________________________ *
// For yandex Service
const transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: 'username@yandex.com',
        pass: 'password' // your emailPassword
    }
})
/* ______________________________________________ */