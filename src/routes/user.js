const express = require('express')
const userRouter = express.Router();
const {userAuth} = require('../utils/auth')
const Connection = require('../models/connection');
const User = require('../models/user')


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
  
});

userRouter.get('/user/connection', userAuth ,async (req,res) => {
  try{
    const user = req.user;

    const connections = await Connection.find({
      $or: [
        {toUserId:user._id, status: 'accepted'},
        {fromUserId:user._id, status: 'accepted'}
      ]
    })
    .populate('toUserId',  ['firstName','lastName','age','gender','skills','photoUrl','about'])
    .populate('fromUserId',['firstName','lastName','age','gender','skills','photoUrl','about'])
    

    const data = connections.map( (item) =>{
      
      if(item.fromUserId._id.toString() === user._id.toString() ) { 
        return item.toUserId
      }else{
        return item.fromUserId
      }
    });
  

    res.json({message:'these are your connections',
      data: data
    })
  }catch(err){
    res.status(400).send('ERROR : '+err.message)
  }
  
});



module.exports = userRouter