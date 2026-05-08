const User = require('../models/User');
const Appointment = require('../models/Appointment');
const LabTest = require('../models/LabTest');
const Prescription = require('../models/Prescription');

const getAppointmentsList = async (userId) => {
  const appointments = await Appointment.find({ patient: userId })
    .populate('doctor', 'fullName')
    .sort({ createdAt: -1 });
  
  return appointments.map(app => ({
    appointment_id: app._id,
    full_name: app.doctor ? app.doctor.fullName : 'Unknown Doctor',
    description: app.description,
    date: app.date,
    time: app.time,
    appointment_status: app.status,
    comments: app.comments
  }));
};

const getDoctorsList = async () => {
  const doctors = await User.find({ userType: 'DOCTOR', userStatus: 'ACTIVE' });
  return doctors.map(doc => ({
    user_id: doc._id,
    full_name: doc.fullName,
    username: doc.username,
    email: doc.email
  }));
};

const getPrescriptionsList = async (userId) => {
  const prescriptions = await Prescription.find({ patient: userId })
    .populate('doctor', 'fullName')
    .sort({ createdAt: -1 });
  
  return prescriptions.map(p => ({
    prescription_id: p._id,
    full_name: p.doctor ? p.doctor.fullName : 'Unknown Doctor',
    prescription: p.prescriptionText,
    prescription_status: p.status,
    prescription_location: p.location
  }));
};

const getLabTestsList = async (userId) => {
  const labTests = await LabTest.find({ patient: userId }).sort({ createdAt: -1 });
  return labTests.map(t => ({
    test_id: t._id,
    details: t.details,
    date: t.date,
    test_status: t.status
  }));
};

const getPayableList = async (userId) => {
  const payableAppointments = await Appointment.find({ 
    patient: userId, 
    status: { $in: ['ACCEPTED', 'PENDING'] } 
  })
    .populate('doctor', 'fullName')
    .sort({ createdAt: -1 });
  
  return payableAppointments.map(app => ({
    appointment_id: app._id,
    full_name: app.doctor ? app.doctor.fullName : 'Unknown Doctor',
    description: app.description,
    date: app.date,
    time: app.time,
    appointment_status: app.status
  }));
};

const getHistoryList = async (userId) => {
  const history = await Appointment.find({ patient: userId, status: 'COMPLETED' })
    .populate('doctor', 'fullName')
    .sort({ createdAt: -1 });
  
  return history.map(app => ({
    appointment_id: app._id,
    full_name: app.doctor ? app.doctor.fullName : 'Unknown Doctor',
    description: app.description,
    date: app.date,
    time: app.time,
    appointment_status: app.status
  }));
};

module.exports = {
  getAppointmentsList,
  getDoctorsList,
  getPrescriptionsList,
  getLabTestsList,
  getPayableList,
  getHistoryList
};
