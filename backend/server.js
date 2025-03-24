const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const devices = [
  { id: 1, name: 'Mobile', status: 'Active', telemetrySource: 'GPS', lastCommunicationTime: '2025-03-24 14:00', model: 'XYZ-1', dataSource: 'API-1' },
  { id: 2, name: 'Camera', status: 'Inactive', telemetrySource: 'Sensor', lastCommunicationTime: '2025-03-24 12:00', model: 'ABC-2', dataSource: 'API-2' }
];

// GET /devices
app.get('/devices', (req, res) => {
  res.json(devices);
});

// GET /devices/:id
app.get('/devices/:id', (req, res) => {
  const device = devices.find(d => d.id === parseInt(req.params.id));
  if (device) res.json(device);
  else res.status(404).json({ error: 'Device not found' });
});

// POST /devices/:id/actions/update-apn
app.post('/devices/:id/actions/update-apn', (req, res) => {
  const device = devices.find(d => d.id === parseInt(req.params.id));
  if (device && device.status === 'Active') {
    res.json({ success: true, message: 'APN updated successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Cannot update APN for inactive devices' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});