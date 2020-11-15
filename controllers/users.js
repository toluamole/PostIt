const User = require('../server/models').user;
const helper = require('../Middleware/helper')
const handleErrors = require('../Middleware/handleErrors')
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
// const sendMail = require('../Middleware/sendMail')

//Signup controller funtion
module.exports.signup_post = async(req, res) => {
  const {name, email, password, telephone} = req.body;

  try {
    const user = await User.create({name, email, password, telephone});
    const token = helper.createToken(user.id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: helper.maxAge * 1000})
    res.status(201).json({user: user.id});
    // sendMail.sendMessage
    
    // create  transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
      user: 'nodemailer32@gmail.com', // Sender's Email
      pass: 'nodemail1234', // Sender's password
      }, 
    }));

    // define mailOptions object
    let mailOptions ={
      from: "nodemailer32@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: 'WELCOME TO POSTIT',
      text: 'Hey there, it’s our first message sent with Nodemailer ;) ', 
    };

    //Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
      return console.log(error);
      }else {
      console.log('Message sent: %s', info.response);
      }
    })
  } 
  catch (err) {
   const errors = handleErrors.handleErrors(err)
    res.status(400).json({errors})
  }
}

// Login Controller function
module.exports.login_post = async(req, res) => {
  const { email, password} = req.body;
  try {
    const user = await User.login(email, password);
    const token = helper.createToken(user.id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: helper.maxAge * 1000})
    res.status(200).json({user: user.id})
  }
  catch (err){
    const errors = handleErrors.handleErrors(err)
    res.status(400).json({ errors })
  }
}
