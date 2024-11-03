const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    channelId:{
        type:String,
        required:true,
    },
    temp:{
        type:Number,
        required:true,
    },
    hum:{
        type:Number,
        required:true
    },
},{timestamps:true});

const sensorData=mongoose.model('sensorData',userSchema);

module.exports=sensorData