const express = require('express')
const profileRouter = express.Router();
const {userAuth} = require('../utils/auth');
const {validateSignupData,validateEditRequestData} = require('../utils/validation');
const bcrypt = require('bcrypt')
const User = require('../models/user')
const validator = require('validator')

profileRouter.get('/profile/view', userAuth ,async (req,res) => {
  try{
  const user = req.user

  res.send(user)

  }
  catch (err) {
    res.status(400).send('ERROR : '+ err.message)
  }
});

profileRouter.patch('/profile/edit', userAuth, async (req,res) => {
  try{
    
    if(!validateEditRequestData(req)) {
      throw new Error('Data is not Valid');
    }
 
    if(validateSignupData(req)) {
      throw new Error('input data is not valid')
    }
    
    const user = req.user;
    
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.gender = req.body.gender;
    user.skills = req.body.skills;
    user.photoUrl = req.body.photoUrl;
    
    await user.save()
    res.send('Profile edited successfully')
  } catch (err) {
    res.status(400).send('ERROR : '+err.message)
  }
});

profileRouter.patch('/profile/password', userAuth, async (req,res) => {
  try{
    const user = req.user;

    const {password,newPassword} = req.body

    if(!password || !newPassword) {
      throw new Error('password and new password required')
    };

    if(password === newPassword){
      throw new Error('new password is same')
    };

    const isPasswordValid = await user.validatePassword(password)
    
    if (!isPasswordValid) {
      throw new Error('invalid password')
    }
    const isPasswordStrong = validator.isStrongPassword(newPassword)
    
    if(!isPasswordStrong){
      throw new Error('password is not Strong')
    }

    const passwordHash = await bcrypt.hash(newPassword,10);

    console.log(passwordHash)
    

    user.password = passwordHash;
    await user.save();
    res.send(' Password changed Successfully')
  } catch (err) {
    res.status(400).send('ERROR : '+err.message)
  }

})

module.exports = profileRouter