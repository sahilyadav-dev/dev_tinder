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