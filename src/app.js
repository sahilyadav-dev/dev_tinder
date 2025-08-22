const express = require('express');
const app = express();
connect = require("./config/database.js")
userModel = require("./models/user.js")

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

  const user = new userModel(req.body)
    
  try {
    await user.save();
    res.send('user data saved')
  }
  catch (err){
    res.status(500).send('error accured in saving data:' + err.message)
  }
})