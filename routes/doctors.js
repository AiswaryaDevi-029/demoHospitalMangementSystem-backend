const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');


router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});


router.put('/:id', async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor removed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
