const {Router}=require("express")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config");
const { courseModel } = require("../db");

const adminRouter=Router();

adminRouter.post("/signup",async (req,res)=>{
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
        await adminModel.create({
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

adminRouter.post("/signin",async(req,res)=>{
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

adminRouter.post("/course",adminAuth,async(req,res)=>{
    const id=req.userId;
    const {title,description,imageURL,price}=req.body;

    await courseModel.create({
        title:title, 
        description:description,
        imageURL:imageURL,
        price:price,
        creatorId:id
    })

    res.json({
        message:"course created"
    })
})

adminRouter.get("/course",adminAuth,async(req,res)=>{
    
})

module.exports={
    adminRouter:adminRouter
}