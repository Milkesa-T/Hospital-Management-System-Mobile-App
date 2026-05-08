const LabTest = require('../models/LabTest');

const updateLabTest = async (id, details) => {
  const labTest = await LabTest.findByIdAndUpdate(id, { details }, { new: true });
  if (!labTest) throw new Error('Lab test not found');
  return labTest;
};

const cancelLabTest = async (id) => {
  const labTest = await LabTest.findByIdAndUpdate(id, { status: 'CANCELLED' }, { new: true });
  if (!labTest) throw new Error('Lab test not found');
  return labTest;
};

module.exports = { updateLabTest, cancelLabTest };
