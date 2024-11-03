
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const userRoute=require('./routes/user');
const { checkForAuthentication } = require('./middlewares/auth');
const cookieParser=require('cookie-parser');
const {restrictHome}=require("./middlewares/restrictHome")

mongoose.connect('mongodb://127.0.0.1:27017/BluePulse')
.then(()=>console.log(`MongoDb Connected Successfully`))
.catch((err)=>console.log('error:',err));

const PORT=process.env.PORT || 8000;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication('token'));
app.use('/home',restrictHome);

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use('/',userRoute);

app.listen(PORT,()=>{
    console.log(`Server Started at PORT:${PORT}`);
})