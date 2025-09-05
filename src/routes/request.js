const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../utils/auth')
const Connection = require('../models/connection')
const User = require('../models/user')

requestRouter.post('/request/:status/:UserId', userAuth , async (req,res) => {
  try {
    const user = req.user;

    const fromUserId = user._id;
    const toUserId = req.params.UserId;
    const status = req.params.status;

    const connection = new Connection({
      fromUserId, toUserId, status
    })
    const toUser = await User.findById(toUserId)
    if(!toUser){
      throw new Error('user does not exist')
    }
    
    const allowedStatus = ['ignored','interested'];

    if(!allowedStatus.includes(status)){
      throw new Error(status +' request status is not valid')
    }

    const isAlreadyExist = await Connection.findOne({
      $or: [
        {fromUserId,toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]});
    
    if(isAlreadyExist){
      throw new Error('Request Already Exist')
    }
    

    const data = await connection.save();
    res.json ({
      message: req.user.firstName + ' send connection request to ',
      data
    })
  } catch (err) {
    res.status(400).send('ERROR : '+ err.message);
  }
})

requestRouter.post('/request/review/:status/:userId', userAuth, async (req,res) => {
  try{
    const user = req.user; 

    const status = req.params.status;
    const toUserId = req.params.userId;
    const fromUserId = user._id;

    const allowedStatus = ['accepted','rejected']
    const isValidStatus = allowedStatus.includes(status);
    if(!isValidStatus) {
      throw new Error('Status is not Valid');
    }

    const connectionRequest = await  Connection.findOne({
      $or:[
      {fromUserId,toUserId},
      {fromUserId: toUserId, toUserId: fromUserId}
    ]});
    console.log(connectionRequest)
    if(!connectionRequest){
      return res
      .status(404)
      .json({message: 'connection request not found'})
    }

    connectionRequest.status = status

    const data = await connectionRequest.save()
    res.json({
      message: 'status is : ' + status,
      data
    })
  }catch (err) {
    res.status(400).send('ERROR : '+ err.message);
  }
  
})

module.exports = requestRouter