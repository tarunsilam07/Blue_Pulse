const express=require('express');
const bcrypt=require('bcryptjs');
const User=require('../models/user');
const {createTokenForUser,validateToken}=require('../authentication/token')

const router=express.Router();

router.post('/signup',async(req,res)=>{
    const {userName,email,password}=req.body;

    try {
        const user=await User.create({
            userName,
            email,
            password,
        })
        return res.status(201).json((user));
    } catch (error) {
        return res.status(400).json({error:'Email already exits'});
    }

});

router.post('/signin', async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user)
            return res.status(404).json({error:"User Not Found"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({error:"Invalid Credentials"});

        const token=createTokenForUser(user);
        return res.status(200).cookie('token',token).json({token});

    } catch (error) {
        return res.status(500).json({error:'Something went wrong'})
    }
});

router.get('/home',(req,res)=>{
    const userToken=req.cookies?.token;

    if(!userToken) return null;

    const user=validateToken(userToken);
    if(!user) return null;

    return res.json({user});
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});


module.exports=router;

