const express=require('express');
const sensorData=require('../models/user')

const router=express.Router();

router.get('/api/:channelId',(req,res)=>{
    const {channelId}=req.params;
    const {temp,hum}=req.query
    console.log(channelId)
    console.log(temp)
    console.log(hum)
    return res.json({
        channelId:channelId,
        temp:temp,
        hum:hum
    })
});

router.post('/api/:channelId',async(req,res)=>{
    const {channelId}=req.params;
    const {temp,hum}=req.query;

    const user=await sensorData.create({
        channelId,
        temp,
        hum
    });
    return res.json({msg:'User created and data updated'});
})



module.exports= router