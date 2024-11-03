
const JWT=require('jsonwebtoken');
const secret_key="BluePulse77@@66";

function createTokenForUser(user){
    const payload={
        fullName:user.fullName,
        email:user.email,
        role:user.role
    }
    const token=JWT.sign(payload,secret_key);
    return token;
};

function validateToken(token){
    if(!token)
        return null;
    try {
        const payload=JWT.verify(token,secret_key);
        return payload;
    } catch (error) {
        return null;
    }
};


module.exports={
    createTokenForUser,
    validateToken
}