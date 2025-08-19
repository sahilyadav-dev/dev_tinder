const express = require('express');
const app = express();

app.listen(3000 , () => {
  console.log('server is up')
});
app.use("/user",
  (req,res,next) => {
  console.log("route handler 1");
  next();
  // res.send('response 1')
  },

  (req,res,next) => {
    console.log("route handler 2")
    next();
    // res.send("response 2")
  },
  (req,res,next) => {
    console.log("route handler 3")
    next();
    // res.send("response 3")
  },
  (req,res,next) => {
    console.log("route handler 4")
    next();
    res.send("response 4")
  }
);
