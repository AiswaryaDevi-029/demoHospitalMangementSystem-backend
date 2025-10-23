const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  phoneNumber: Number
});

module.exports = mongoose.model('Patient', PatientSchema);
