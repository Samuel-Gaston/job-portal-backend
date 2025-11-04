import mongoose from 'mongoose';

const JobSchema = mongoose.Schema({
    title:String,
    qualification:String,
    description:String,
    skill:String,
    deadline:String
},{
    timestamps:true,
})

const JobModel = mongoose.model("job", JobSchema)

export default JobModel;