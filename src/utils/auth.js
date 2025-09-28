const User = require('../models/user')
const jwt = require('jsonwebtoken')



const userAuth = async (req,res,next) => {
  try{
    const {token} = req.cookies
    
    if(!token) {
      return res.status(401).send('please login')
    };
    
    const isAuthorised = await jwt.verify(token,'$sahil@')
    const {id} = isAuthorised;

    const user = await User.findById(id);

    if(!user) {
      throw new Error('no user found')
    }

    req.user = user
    next();
  } 
  catch(err){
    res.status(400).send('ERROR : '+ err.message)
  }  
  
}

module.exports = {userAuth}