const User = require('../server/models').user;
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, 'Securesecertkey', {
    expiresIn: maxAge
  })
}

module.exports.signup_get = (req, res) => {
  res.send('signup');
}

module.exports.signup_post = async(req, res) => {
  const {name, email, password, telephone} = req.body;
  try {
    const user = await User.create({name, email, password, telephone});
    const token = createToken(user.id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user: user.id})
  } 
  catch (error) {
    res.status(400).send(error)
  }
}