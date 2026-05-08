const Prescription = require('../models/Prescription');

const markAsReceived = async (id) => {
  const prescription = await Prescription.findByIdAndUpdate(id, { status: 'RECEIVED' }, { new: true });
  if (!prescription) throw new Error('Prescription not found');
  return prescription;
};

module.exports = { markAsReceived };
