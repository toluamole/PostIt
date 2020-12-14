const User = require('../server/models').user;
const helper = require('../Middleware/helper')
const handleErrors = require('../Middleware/handleErrors')
const sendMail = require('../Middleware/sendMail');
const resetMail = require('../Middleware/resetMail');
const {hashPassword} = require('../Middleware/helper')


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


// Find a user and send a reset link to their email
module.exports.sendResetLink = async (req, res) => {
  const {email} = req.body
  let user, link
  try {
    user = await User.findOne({
      where:{
        email: email
      }
    })
    if(!email){
      return res.status(400).send({error: 'Email is required'})
    }
    if(!user){
      return res.status(404).send({error: 'User not found'} )
    }
    else{
      res.status(200).json({message: 'Password reset link sent successfully'})
    }
  }
  catch (err){
    res.status(400).json(err)
  }
    const token = helper.createToken(user.id)
    link = `http://localhost:8000/reset_password/${token}` 
    const resetEMail = () => {
     resetMail.transporter.sendMail(resetMail.mailOptions(user,link), (error, info) => {
      if (error) {
        return console.log(error);
        }else {
         console.log('Message sent: %s', info.response);
        }
    })
   }
   resetEMail()
}

//Update users password with the link sent to their mail
module.exports.resetPassword = async(req, res) => {
  try {
    const {password} = req.body
    const {token} = req.params
    const decoded = helper.verifyToken(token)
    const hash = hashPassword(password);
    
    const updatedUser = await User.update(
      {password: hash},
      {where: {id: decoded.id},
      returning:true,
      plain: true    
    }
    )
    const {id, name, email, telephone} = updatedUser[1]
    return res.status(200).send({token, user: {id, name, email, telephone}})
  } catch (error) {
    console.log(error)
  }
}