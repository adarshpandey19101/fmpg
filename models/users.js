// userSchema.js
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const db=require("../mongodb/db.js");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);