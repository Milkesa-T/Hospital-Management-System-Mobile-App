const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  details: { type: String, required: true },
  date: { type: String },
  status: { 
    type: String, 
    enum: ['ACCEPTED', 'COMPLETED', 'CANCELLED', 'PAID'], 
    default: 'ACCEPTED' 
  },
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LabTest', labTestSchema);
