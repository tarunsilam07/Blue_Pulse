const JWT=require('jsonwebtoken');
const secret_key=process.env.SECRET_KEY;

const createTokenForUser=(user)=>{
    const payload={
        userName:user.userName,
        email:user.email,
        role:user.role
    };
    const token=JWT.sign(payload,secret_key);
    return token;
};

const validateToken=(token)=>{
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
    createTokenForUser,validateToken
}