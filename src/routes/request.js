const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../utils/auth')

requestRouter.post('/request', userAuth , (req,res) => {
  try {
    const user = req.user;

  res.send(user.firstName + ' send connection request')
  } catch (err) {
    res.status(400).send('ERROR : '+ err.message);
  }
})

module.exports = requestRouter