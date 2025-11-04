import mongoose from "mongoose";

const InterviewSchema = mongoose.Schema({
  title:String,
  name:String,
  date:String,  
},{
    timestamps:true
})

const InterviewModel = mongoose.model("interview", InterviewSchema)

export default InterviewModel;