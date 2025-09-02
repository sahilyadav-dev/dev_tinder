const express = require('express');
const connect = require("./config/database.js");
const User = require("./models/user.js");
const {validateSignupData} = require('./utils/validation.js');
const bcrypt = require('bcrypt');
const cookieParse = require('cookie-parser');
const jwt = require('jsonwebtoken')
const {userAuth} = require('./utils/auth.js')

const app = express();

app.use(express.json());
app.use(cookieParse());
connect()
  .then( () => {
    console.log('connection to database is sucessfull');
    app.listen(3000 , () => {console.log('server is up')})
  })
  .catch((err) => {
    console.error('failed')
  });

app.post("/signup", async (req,res) => { 
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

app.get('/profile', userAuth ,async (req,res) => {
  try{
  
  
  const user = req.user

  
  res.send(user)

  }
  catch (err) {
    res.status(400).send('ERROR : '+ err.message)
  }
})

app.get('/login',async (req,res) => {
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

app.patch('/user/update',async (req,res) => {
  const id = req.body._id
  const data = req.body
  console.log(id)
  try{
    // const allowedUpdate = ["firstName","lastName","age","gender"];
    // const isAllowedUpdate = Object.keys(data).every((k) => allowedUpdate.includes(k));
    // if(!isAllowedUpdate) {
    //   throw new Error('update not allowed');
    // }
    const user = await User.findByIdAndUpdate(id,data,{runValidators: true});

    
    res.send('user updated');
  }
  catch (err){
    res.status(400).send('not found:'+ err.message);
  }
})

app.get("/user/id",async (req,res) => {
  const id = req.body._id;
  console.log(id)

  try{
    const user = await User.findById(id);
    res.send(user)
  } 
  catch (err){
    res.status(400).send('not found')
  }
})

app.get('/user', async (req,res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail)
  
  try {
    const user = await User.find({emailId : userEmail})
    res.send(user)
  }
  catch (err){
    res.status(400).send('error accured in saving data:' + err.message)
  }
 
})

app.get("/feed",async (req,res) => {
  

  try{
    const users = await User.find({})
    res.send(users);
  } 
  catch (err) {
    res.status(400).send('not found')
  }
})

app.delete('/delete/id',async (req,res) => {
  const id = req.body.firstName
  console.log(id)

  try{
    const user = await User.findOneAndDelete({firstName: id});
    res.send('user deleted');
  }
  catch (err){
    res.status(400).send('not found');
  }
})

app.delete('/delete',async (req,res) => {
  const id = req.body.emailId
  console.log(id)

  try{
    const user = await User.deleteOne({emailId: id});
    res.send('user deleted');
  }
  catch (err){
    res.status(400).send('not found');
  }
})

