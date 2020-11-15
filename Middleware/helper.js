const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({id}, 'Securesecertkey', {
    expiresIn: maxAge
  })
}



module.exports = {createToken, maxAge}