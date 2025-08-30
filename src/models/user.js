const mongoose = require("mongoose");
const validator = require("validator")

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
    validate(value){
      if(!validator.isEmail(value)) {
        throw new Error('email is invalid')
      }
    }
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 120,
    required: true,
    // validate(value) {
    //   if(!validator.isStrongPassword(value)) {
    //     throw new Error("input strong password")
    //   }
    // }
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

const userModel = mongoose.model("user",UserSchema);

module.exports = userModel;