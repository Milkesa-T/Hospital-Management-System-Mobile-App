const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true 
  },
  prescriptionText: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'SHIPPED', 'RECEIVED', 'COMPLETED'], 
    default: 'PENDING' 
  },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
