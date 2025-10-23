const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Scheduled' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
