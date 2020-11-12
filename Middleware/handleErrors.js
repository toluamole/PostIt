//handle errors
const handleErrors = (err) => {
    let errors = { name: '', email: '', password: '', telephone: '', }
  
    // //duplicate user 
    // if(!errors.isNewRecord ) {
    //   errors = 'User already exists'
    //   return errors
    // }
  
    //Incorrect email
    if(err.message === 'Incorrect Email'){
      errors.email = 'Email is not registered'
    }
  
    //Incorrect password
    if(err.message === 'Incorrect Password'){
      errors.password = 'Password is incorrect'
    }
    // validation errors
    if(err.message.includes('Validation error')) {
      Object.values(err.errors).forEach(error => {
        errors[error.path] = error.message
      })
    }
  
    return errors
}
module.exports = { handleErrors}