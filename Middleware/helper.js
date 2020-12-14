const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({id}, 'Securesecertkey', {
    expiresIn: maxAge
  })
}

// Verify jwt token and destroy after 24hrs
function verifyToken(token) {
  const decoded = jwt.verify(token, 'Securesecertkey', {
    expiresIn: '24h'
  })
  return decoded
}

const hashPassword = (password) => bcrypt.hashSync(password, 10)

module.exports = {createToken, maxAge, verifyToken, hashPassword}