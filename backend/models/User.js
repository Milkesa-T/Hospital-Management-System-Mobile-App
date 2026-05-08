const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  address: { type: String },
  password: { type: String, required: true },
  userType: { 
    type: String, 
    enum: ['ADMIN', 'DOCTOR', 'NURSE', 'STAFF', 'PATIENT'], 
    default: 'PATIENT' 
  },
  userStatus: { 
    type: String, 
    enum: ['ACTIVE', 'BLOCKED'], 
    default: 'ACTIVE' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
