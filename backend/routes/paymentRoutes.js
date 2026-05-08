const express = require('express');
const router = express.Router();
const { recordPayment, createIntent } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/create-intent', protect, createIntent);
router.post('/charge', protect, recordPayment);

module.exports = router;
