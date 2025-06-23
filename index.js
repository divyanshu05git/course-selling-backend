const express=require("express")
const mongoose=require("mongoose")

const app=express()

app.use(express.json())

const {userRouter} =require("./routes/user")
const {courseRouter}=require("./routes/course")
const {adminRouter} =require("./routes/admin")

app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminRouter)


async function main(){
    await mongoose.connect("mongodb+srv://divyanshu05di:divyanshu%40mongodb@cluster0.g2ptdfl.mongodb.net/course-era")
    app.listen(3000)
    console.log("connected")
}

main()