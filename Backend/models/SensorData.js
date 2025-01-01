const mongoose = require('mongoose');

const dataSchema=new mongoose.Schema({
    temperature:{
        type:String,
        default:"0"
    },
    pH:{
        type:String,
        default:"0"
    },
    oxygen:{
        type:String,
        default:"0"
    },
    conductivity:{
        type:String,
        default:"0"
    },
    nitrate:{
        type:String,
        default:"0"
    },
    timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model('SensorData', dataSchema);

module.exports=SensorData;