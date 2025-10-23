const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');


router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient removed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
