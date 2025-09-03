const validator = require('validator')

const validateSignupData = (req) => {
  const {firstName,lastName,password,emailId,age,gender,photoUrl,skills} = req.body
  
  if(!validator.isStrongPassword(password)) {
    throw new Error("weak password")
  }else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email Id")
  }else if(!['male','female','other'].includes(gender)) {
    throw new Error('gender data is not valid')
  }else if(!validator.isURL(photoUrl)) {
    throw new Error("invalid url")
  }else if(skills.length>10) {
    throw new Error("cannot add more than 10 skills")
  }   
}

const validateEditRequestData = (req) => {
  const allowedEditField = ['firstName','lastName','emailId','password','age','gender','photoUrl','skills'];
  
  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditField.includes(field))
  
  return isEditAllowed;
}

module.exports = {validateSignupData,validateEditRequestData}