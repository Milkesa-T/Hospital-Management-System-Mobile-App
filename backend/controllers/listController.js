const listService = require('../services/listService');

const getLists = async (req, res) => {
  const { user_id, list_type } = req.body;

  try {
    let data;
    switch (list_type) {
      case 'appointments':
        data = { appointmentList: await listService.getAppointmentsList(user_id) };
        break;
      case 'doctors':
        data = { doctorsList: await listService.getDoctorsList() };
        break;
      case 'prescriptions':
        data = { prescriptionsList: await listService.getPrescriptionsList(user_id) };
        break;
      case 'lab_tests':
        data = { labTestsList: await listService.getLabTestsList(user_id) };
        break;
      case 'payable':
        data = { payableList: await listService.getPayableList(user_id) };
        break;
      case 'history':
        data = { historyList: await listService.getHistoryList(user_id) };
        break;
      default:
        return res.status(400).json({ message: 'Invalid list type', error: true });
    }
    res.json({ ...data, error: false });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

module.exports = { getLists };
