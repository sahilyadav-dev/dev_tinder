const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 120,
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if(!['male','female','other'].includes(value)) {
        throw new Error('gender data is not valid')
        
      }
    }
  }
},{
  timestamps: true
})

const userModel = mongoose.model("user",UserSchema);

module.exports = userModel;