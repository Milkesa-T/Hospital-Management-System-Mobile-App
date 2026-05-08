const express = require('express');
const router = express.Router();
const { markAsReceived } = require('../controllers/prescriptionController');

const { protect } = require('../middleware/auth');

router.post('/mark-received', protect, markAsReceived);

module.exports = router;
