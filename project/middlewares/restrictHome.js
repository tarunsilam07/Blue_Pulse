
const {validateToken}=require('../authentication/auth');

async function restrictHome(req,res,next) {
    const userToken=req.cookies?.token;

    if(!userToken) return null;

    const user=validateToken(userToken);
    if(!user) return res.redirect('/');

    req.user=user;
    next();
};

module.exports={
    restrictHome
}