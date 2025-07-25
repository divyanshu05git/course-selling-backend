const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;


const userSchema=new Schema({
    email:{type:String,unique:true},
    firstName:String,
    lastName:String,
    password:String

})

const adminSchema= new Schema({
    email:{type:String,unique:true},
    firstName:String,
    lastName:String,
    password:String
})

const courseSchema=new Schema({
    creatorId:ObjectId,
    title:String,
    description:String,
    price:Number,
    imageUrl:String
})

const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const userModel=mongoose.model("user",userSchema)
const adminModel=mongoose.model("admin",adminSchema)
const courseModel=mongoose.model("course",courseSchema)
const purchaseModel=mongoose.model("purchase",purchaseSchema)

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
