import mongoose from "mongoose";


const ApplicationSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    qualification:String,
    skill:String,
    location:String,
    hobbies:String,
    certificate:String
},{
    timestamps:true
})

const ApplicationModel = mongoose.model("application", ApplicationSchema)

export default ApplicationModel;