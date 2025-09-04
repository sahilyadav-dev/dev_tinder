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

authRouter.get('/login',async (req,res) => {
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
      res.send('login sucessfull');
    }else{
      throw new Error('invalid email and password')
    }
  }
  catch (err){
    res.status(400).send('ERROR : ' + err.message)
  }
})

authRouter.patch('/logout', async (req,res) => {
  res.clearCookie('token')
  res.send('Logged out Successfull')
})

module.exports = authRouter