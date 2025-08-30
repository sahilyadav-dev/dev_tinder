const express = require('express');
const app = express();
connect = require("./config/database.js")
User = require("./models/user.js")

app.use(express.json())
connect()
  .then( () => {
    console.log('connection to database is sucessfull');
    app.listen(3000 , () => {console.log('server is up')})
  })
  .catch((err) => {
    console.error('failed')
  });

app.post("/signup", async (req,res) => {

  const user = new User(req.body)
    
  try {
    await user.save();
    res.send('user data saved')
  }
  catch (err){
    res.status(500).send('error accured in saving data:' + err.message)
  }
});

app.patch('/user/update',async (req,res) => {
  const id = req.body._id
  const data = req.body
  console.log(id)

  try{
    const user = await User.findByIdAndUpdate(id,data,{runValidators: true});
    res.send('user updated');
  }
  catch (err){
    res.status(400).send('not found');
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

