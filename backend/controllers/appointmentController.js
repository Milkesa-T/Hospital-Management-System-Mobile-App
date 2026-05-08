const appointmentService = require('../services/appointmentService');

const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    
    // Socket.io notification logic remains in the controller (or moved to a notification service)
    const io = req.app.get('socketio');
    if (io && appointment.doctor) {
      io.to(appointment.doctor.toString()).emit('new_appointment', { appointmentId: appointment._id });
    }

    res.status(201).json({ 
      message: 'Appointment created successfully!', 
      error: false,
      appointment_id: appointment._id
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

const updateAppointment = async (req, res) => {
  const { appointment_id, description } = req.body;
  try {
    await appointmentService.updateAppointment(appointment_id, description);
    res.json({ message: 'Appointment updated successfully!', error: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

const cancelAppointment = async (req, res) => {
  const { appointment_id } = req.body;
  try {
    await appointmentService.cancelAppointment(appointment_id);
    res.json({ message: 'Appointment cancelled successfully!', error: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

module.exports = {
  createAppointment,
  updateAppointment,
  cancelAppointment
};
