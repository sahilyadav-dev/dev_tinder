const mongoose = require('mongoose');
const validator = require('validator')

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
      values: ['accepted','rejected','intrested','ignored'],
      message: 'Status is not Valid,',
    },
    required: true,
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Connection',ConnectionSchema);