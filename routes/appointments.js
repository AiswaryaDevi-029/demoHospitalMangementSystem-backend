const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

router.post('/', async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      time
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: 'Doctor is already booked for this date and time.' });
    }

    const appointment = new Appointment({
      doctorId,
      patientId,
      date: new Date(date), 
      time
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ message: 'Error creating appointment', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctorId', 'name specialization availability')
      .populate('patientId', 'name age gender phoneNumber')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { date, time } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, date: new Date(date), time },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: 'Appointment not found' });

    res.json(updated);
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Appointment not found' });

    res.json({ message: 'Appointment canceled successfully.' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
