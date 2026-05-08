const Appointment = require('../models/Appointment');

const createAppointment = async (appointmentData) => {
  const { user_id, doctor_id, description } = appointmentData;
  const appointment = await Appointment.create({
    patient: user_id,
    doctor: doctor_id,
    description,
    status: 'PENDING'
  });
  return appointment;
};

const updateAppointment = async (id, description) => {
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { description },
    { new: true }
  );
  if (!appointment) throw new Error('Appointment not found');
  return appointment;
};

const cancelAppointment = async (id) => {
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status: 'CANCELLED' },
    { new: true }
  );
  if (!appointment) throw new Error('Appointment not found');
  return appointment;
};

module.exports = {
  createAppointment,
  updateAppointment,
  cancelAppointment
};
