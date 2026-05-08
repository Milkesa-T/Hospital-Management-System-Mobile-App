const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  description: { type: String, required: true },
  date: { type: String }, // Storing as string or Date
  time: { type: String },
  status: { 
    type: String, 
    enum: ['PENDING', 'ACCEPTED', 'COMPLETED', 'REJECTED', 'CANCELLED', 'PAID'], 
    default: 'PENDING' 
  },
  comments: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
