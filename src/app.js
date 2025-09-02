const express = require('express');
const connect = require("./config/database.js");
const User = require("./models/user.js");
const cookieParse = require('cookie-parser');
const app = express();

const authRouter = require('./routes/auth.js')
const profileRouter = require('./routes/profile.js')
const requestRouter = require('./routes/request.js')

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


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);



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

