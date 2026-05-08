const paymentService = require('../services/paymentService');

const createIntent = async (req, res) => {
  const { amount, currency, payment_for } = req.body;
  try {
    const description = `Payment for ${payment_for}`;
    const intent = await paymentService.createPaymentIntent(amount, currency, description);
    res.json({
      client_secret: intent.client_secret,
      id: intent.id,
      error: false
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

const recordPayment = async (req, res) => {
  try {
    const result = await paymentService.recordPayment(req.body);
    res.json({ ...result, error: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

module.exports = { createIntent, recordPayment };
