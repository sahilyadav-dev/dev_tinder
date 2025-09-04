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
      message: req.user.firstName + ' send connection request',
      data
    })
  } catch (err) {
    res.status(400).send('ERROR : '+ err.message);
  }
})

module.exports = requestRouter