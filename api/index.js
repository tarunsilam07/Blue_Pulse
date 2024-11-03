
const express=require('express');
const mongoose=require('mongoose');
const userRoute=require('./routes/user');
const bodyParser = require('body-parser');

const app=express();
const PORT= process.env.PORT || 3700;

mongoose.connect('mongodb://127.0.0.1:27017/Sensor')
.then(()=>console.log(`MongoDB connected Successfully`))
.catch((err)=>console.log('error',err));

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.use('/',userRoute);


app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})