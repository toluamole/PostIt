const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

  // create  transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
        user: 'nodemailer32@gmail.com', // Sender's Email
        pass: 'nodemail1234', // Sender's password
        }, 
    }));

    // send mail with defined transport object
    let mailOptions = {
        from: "nodemailer32@gmail.com", // sender address
        to: '', // list of receivers (I want to be able to pass registered user's email dynamically, instead of hardcoding it, so i can use this module in the controller)
        subject: 'WELCOME TO POSTIT',
        text: 'Hey there, it’s our first message sent with Nodemailer ;) ', 
    };
    let sendMessage = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return console.log(error);
        }else {
        console.log('Message sent: %s', info.response);
        }
    })

module.exports = {sendMessage}