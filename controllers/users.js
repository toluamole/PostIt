const User = require('../server/models').user;
const helper = require('../Middleware/helper')
const handleErrors = require('../Middleware/handleErrors')
const sendMail = require('../Middleware/sendMail');

//Signup controller funtion
module.exports.signup_post = async(req, res) => {
  const {name, email, password, telephone} = req.body;
  let user;
  
  try {
    user = await User.create({name, email, password, telephone});
    const token = helper.createToken(user.id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: helper.maxAge * 1000})
    res.status(201).json({user: user.id});
  } 
  catch (err) {
   const errors = handleErrors.handleErrors(err)
    res.status(400).json({errors})
  }
  
  // Send mail to user on successful signup
  const emailDetails = sendMail.mailOptions(user)
  const transporter = sendMail.transporter
  const sendEmail = () => {
    transporter.sendMail(emailDetails, (error, info) => {
      if (error) {
        return console.log(error);
        }else {
         console.log('Message sent: %s', info.response);
        }
    })
  }
  sendEmail()
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
