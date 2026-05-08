const prescriptionService = require('../services/prescriptionService');

const markAsReceived = async (req, res) => {
  const { prescription_id } = req.body;
  try {
    await prescriptionService.markAsReceived(prescription_id);
    res.json({ message: 'Prescription marked as received!', error: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

module.exports = { markAsReceived };
