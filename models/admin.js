const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const db=require("/Users/vivekkumar/Documents/practice/mongodb/db.js");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true }
});

// Encrypt password before saving
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare hashed password
AdminSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model('Admin', AdminSchema);

const admin = new Admin({
  username: 'vivekkumarprince1',
  email: 'vivekkumarprince1@gmail.com',
  password: 'Prince1@',
  mobileNumber: '7321835093'
});

admin.save((err, admin) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Admin created successfully!');
  }
});