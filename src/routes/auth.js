const express = require('express')
const authRouter = express.Router();
const {validateSignupData} = require('../utils/validation')
const bcrypt = require('bcrypt')
const User = require('../models/user')



authRouter.post("/signup", async (req,res) => { 
  try {

    validateSignupData(req)
    const {firstName,lastName,emailId,password,age,gender,skills,photoUrl,about} = req.body

    const hashPassword = await bcrypt.hash(password,10,)
    
    const user = new User({
      firstName,lastName,emailId,password: hashPassword,age,gender,skills,photoUrl,about
    });
    await user.save();
    res.send('user data saved')
  }
  catch (err){
    res.status(500).send('ERROR : ' + err.message)
  }
});

authRouter.post('/login',async (req,res) => {
  try{
  const {emailId,password} = req.body;
  
    const user = await User.findOne({emailId: emailId})

    if(!user) {
      throw new Error('no user found')
    }

    const isPasswordValid = await user.validatePassword(password);;
    
    if(isPasswordValid) {
      const token = await user.getJWT()
      res.cookie('token',token);
      res.send(user);
    }else{
      throw new Error('Invalid Email and Password')
    }
  }
  catch (err){
    res.status(401).send('ERROR : ' + err.message)
  }
})

authRouter.post('/logout', async (req,res) => {
  res.clearCookie('token')
  res.json({
    message: 'Logged out Successfull'
  })
})

module.exports = authRouter