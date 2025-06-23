const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")  

function userAuth(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWT_SECRET);

    if(decode){
        req.userId=decoded.id;
        next()
    }
    else{
        res.status(403).json({
            message:"you are not signed in"
        })
    }
}

module.exports={
    userAuth:userAuth
}