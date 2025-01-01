const express = require('express');

const router = express.Router();

const SensorData=require('../models/SensorData')

router.get('/api/data', async (req, res) => {
  console.log(req.query)
  const { temperature, pH,oxygen,conductivity,nitrate } = req.query;
  const newData = await SensorData.create({
    temperature,
    pH,
    oxygen,
    conductivity,
    nitrate 
  });
  const io = req.app.get('io');
  if (io) {
    io.emit('newData', newData);
  } else {
    console.log("WebSocket server is not initialized.");
  }

  res.status(201).send(newData);
});

module.exports = router;
