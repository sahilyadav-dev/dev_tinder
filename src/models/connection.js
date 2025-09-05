const mongoose = require('mongoose');


const ConnectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ['accepted','rejected','interested','ignored'],
      message: 'Status is not Valid,',
    },
    required: true,
  }
},
{
  timestamps: true
})

ConnectionSchema.pre('save', function () {
  const connectionRequest = this;

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error('cannot send request to yourself')
  }
})

module.exports = mongoose.model('Connection',ConnectionSchema);