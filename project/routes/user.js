
const express=require('express');
const router=express.Router();
const User=require('../models/user')

router.get('/',(req,res)=>{
    return res.render('index');
});


router.get('/home',(req,res)=>{
    return res.render('home');
})

router.post('/signup',async(req,res)=>{

    try {
        const {fullName,email,password}=req.body;
        const user= await User.create({
            fullName,
            email,
            password
        });
        return res.redirect('/home');
    } catch (error) {
        return res.render('index',{
            error:"Email Already Exits"
        })
    }

});

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const token= await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie('token',token).redirect('/home');
    } catch (error) {
        return res.render('index',{
            error:'Incorrect Password or Email'
        })
    }
    
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});



module.exports=router;