const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  }
})

const userModel = mongoose.model("user",UserSchema);

module.exports = userModel;