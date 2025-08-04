
const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData'); 


router.get('/sensor-data/recent', async (req, res) => {
    try {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); 
        const recentData = await SensorData.find({ timestamp: { $gte: twoHoursAgo } })
        // .sort({ timestamp: -1 });
        res.json(recentData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving sensor data.' });
    }
});

module.exports = router;
