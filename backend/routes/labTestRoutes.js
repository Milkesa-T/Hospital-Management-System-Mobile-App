const express = require('express');
const router = express.Router();
const { updateLabTest, cancelLabTest } = require('../controllers/labTestController');

const { protect } = require('../middleware/auth');

router.post('/update', protect, updateLabTest);
router.post('/cancel', protect, cancelLabTest);

module.exports = router;
