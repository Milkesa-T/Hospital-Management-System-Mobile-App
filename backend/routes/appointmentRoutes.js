const express = require('express');
const router = express.Router();
const { 
  createAppointment, 
  updateAppointment, 
  cancelAppointment 
} = require('../controllers/appointmentController');

const { protect } = require('../middleware/auth');

router.post('/create', protect, createAppointment);
router.post('/update', protect, updateAppointment);
router.post('/cancel', protect, cancelAppointment);

module.exports = router;
