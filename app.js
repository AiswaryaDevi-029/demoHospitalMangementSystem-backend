const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT ?? 3000;
let environmentName = process.env.ENV_NAME ?? 'development';


app.use(cors());
app.use(bodyParser.json());



app.get('/getEnv', (req,res) => {
  res.send('Hospital Management System API is running at port ' + port);
  res.send('Environment name: ' + environmentName);
})

mongoose.connect('mongodb://127.0.0.1:27017/hospitalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const doctorRoutes = require('./routes/doctors');
const patientRoutes = require('./routes/patients');
const appointmentRoutes = require('./routes/appointments');

app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
