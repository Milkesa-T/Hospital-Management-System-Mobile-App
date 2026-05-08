const labTestService = require('../services/labTestService');

const updateLabTest = async (req, res) => {
  const { test_id, details } = req.body;
  try {
    await labTestService.updateLabTest(test_id, details);
    res.json({ message: 'Lab test updated successfully!', error: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

const cancelLabTest = async (req, res) => {
  const { test_id } = req.body;
  try {
    await labTestService.cancelLabTest(test_id);
    res.json({ message: 'Lab test cancelled successfully!', error: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

module.exports = { updateLabTest, cancelLabTest };
