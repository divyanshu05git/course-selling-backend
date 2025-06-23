const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")  

function userAuth(req,res,next){
    const token=req.headers.token;

    if(!token){
        res.status(401).json({
            message:"token missing"
        })
    }

    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch(err){
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports={
    userAuth:userAuth
}