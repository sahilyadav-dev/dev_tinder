const express = require('express');
const app = express();
const {adminAuth,userAuth} = require('./utils/auth.js')

app.listen(3000 , () => {
  console.log('server is up')
});
app.use("/user",userAuth,);

app.get('/user/data', (req,res) => {
  res.send('recieved all user data')
})

app.use("/admin",adminAuth);

app.get("/admin/getdata",(req,res) => {
  res.send("recieved all admin data")
});

app.use('/',(err,req,res,next)=>{
  if(err) {
    res.status(500).send('something went wrong')
  }
})