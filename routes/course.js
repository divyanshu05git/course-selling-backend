const {Router}=require("express")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")
const {userAuth}=require("../middlewares/userMiddleware")
const {purchaseModel,courseModel}=require("../db")

const courseRouter=Router();

courseRouter.post("/purchase",userAuth,async(req,res)=>{
    const userId=req.userId;
    const courseId=req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message:"course hase been bought"
    })
})

courseRouter.get("/preview",async(req,res)=>{
    const courses=await courseModel.find({})

    res.json({
        courses
    })
})

module.exports={
    courseRouter:courseRouter
}