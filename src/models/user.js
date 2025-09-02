const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: [4,'firstname should be greater than 4 leters'],
    maxlength: [20,'first should not exced 20 leters'],
    required: [true,'firstname required']
  },
  lastName: {
    type: String,
    minlength: [4,'firstname should be greater than 4 leters'],
    maxlength: [20,'first should not exced 20 leters'],
    required: [true,'lastname required']
  },
  emailId: {
    type: String,
    required: [true,'email id required'],
    lowercase: [true,'all letter should be lowercase'],
    trim: true,
    unique: [true,"email id already exist"],
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('enter valid email id')
      }
    }
    
  },
  password: {
    type: String,
    minlength: [8,'must have atleast 8 digits'],
    maxlength: [120,'max length reached'],
    required: [true,'required'],
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error("input strong password")
      }
    }
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
  },
  skills: {
    type: [String],
    minlength: 1,
    maxlenth: 10,
    validate(value) {
      if(value.length>10) {
        throw new Error("add 10 skills only")
      }
    }
  },
  photoUrl: {
    type: String,
    default: "https://commons.wikimedia.org/wiki/File:Default-welcomer.png",
    validate(value) {
      if(!validator.isURL(value)) {
        throw new Error("invalid url")
      }
    }
  },
  about: {
    type: String,
    trim: true,
    maxlength: 500
  }
},{
  timestamps: true
})

UserSchema.methods.getJWT = async function() {
  const user = this;

  const token = await jwt.sign({id: user._id}, '$sahil@', {expiresIn: '7d'})

  return token;
}

UserSchema.methods.validatePassword = async function(password) {
  const user = this;
  const passwordHash = user.password
  const isPasswordValid = await bcrypt.compare(password,passwordHash);

  return isPasswordValid;
}



module.exports = mongoose.model("User",UserSchema);
