const validator = require('validator')

const validateSignupData = (req) => {
  const {password,emailId,gender,photoUrl,skills} = req.body
  
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

// const req = {
//   password: 'sahil',
//   emailId: 'sfasdfadf'

// }

// const validateUpdateData = function(req) {
//   const updates = {} 

//   if(req.password){
//     updates.password = req.password
//   }
//   if(req.emailId){
//     updates.emailId = req.emailId
//   }
//   if(req.gender){
//     updates.gender = req.gender
//   }
//   if(req.photoUrl){
//     updates.photoUrl = req.photoUrl
//   }
//   if(req.skills){
//     updates.skills = req.skills
//   }

  
//   return updates
// }
// const data = validateUpdateData(req)



// if (!validator.isEmail(data.emailId)) {
  
// }


module.exports = {validateSignupData}