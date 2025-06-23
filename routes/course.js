const {Router}=require("express")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")

const courseRouter=Router();

courseRouter.post("/purchase",(req,res)=>{

})

courseRouter.get("/preview",(req,res)=>{

})

module.exports={
    courseRouter:courseRouter
}