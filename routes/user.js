const {Router}=require("express")
const bcrypt=require("bcrypt")
const {z}=require("zod")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")

const {userModel,purchaseModel}=require("../db")
const { userAuth } = require("../middlewares/userMiddleware")

const userRouter=Router();
userRouter.post("/signup",async(req,res)=>{
    const requiredBody=z.object({
        email:z.string().email()
    })

    const { email, password, firstName, lastName}=req.body;
    const hashedPassword=await bcrypt.hash(password,10)

    const parsedDataWithSuccess=requiredBody.safeParse(req.body)

    if(!parsedDataWithSuccess.success){
        res.json({
            message:"Incorrect format"
        })
        return
    }

    try{
        await userModel.create({
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName
        })
        res.json({
            message:"account created"
        })
    }
    catch(err){
        res.json({
            message:"error while signing up"
        })
    }
})

userRouter.post("/signin",async(req,res)=>{
    const {email ,password}=req.body

    const user= await userModel.findOne({
        email:email
    })

    if(!user){
        res.json({
            message:"user doesnt exist"
        })
        return;
    }

    const passwordMatch=await bcrypt.compare(password,user.password)

    if(user&&passwordMatch){
        const token=jwt.sign({
                id:user._id.toString() //.id is unique ..check in the database
            },JWT_SECRET)
        
        res.json({
            token 
        })
    }
})

userRouter.get("/purchases",userAuth,async(req,res)=>{
    const userId=req.userId;

    const course=await purchaseModel.find({
        userId:userId
    })
    res.json({
        course
    })
})

module.exports={
    userRouter:userRouter
}