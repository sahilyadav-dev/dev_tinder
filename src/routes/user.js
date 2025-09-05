const express = require('express')
const userRouter = express.Router();
const {userAuth} = require('../utils/auth')
const User = require('../models/user');
const Connection = require('../models/connection');

userRouter.get('/user/request/received', userAuth, async (req,res) => {
  try{
    const user = req.user;

    const requests = await Connection
    .find({toUserId: user._id,status: 'interested'})
    .populate('fromUserId',['firstName','lastName','age','gender','skills','photoUrl','about'] )
    if(!requests.length > 0) {
      return res.status(404).json({message: 'no request found'})
    }

    res.json({
      message: 'request found',
      data: requests,
    })
  }catch (err) {
    res.status(400).send('ERROR : '+err.message)
  }
  
})

module.exports = userRouter