const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

  // create  transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
        user: 'nodemailer32@gmail.com', // Sender's Email
        pass: 'nodemail1234', // Sender's password
        }, 
    }));

    // define transport parameters
    const  mailOptions = (user) => {
       const from = "nodemailer32@gmail.com" // sender address
        const to = user.email // list of receivers (I want to be able to pass registered user's email dynamically, instead of hardcoding it, so i can use this module in the controller)
        const subject = 'WELCOME TO POSTIT'
        const text = 'Hey there, it’s our first message sent with Nodemailer ;) '
        return {from, to, subject, text}
    };

module.exports = {transporter, mailOptions}