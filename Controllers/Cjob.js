import JobModel from "../Models/Mjob.js";
import dotenv from 'dotenv';

dotenv.config();


const getJobs = async(req, res) =>{
   
    try {
       const jobs = await JobModel.find();
      if(jobs){
        res.status(200).json(jobs);
      }
      else{
        res.status(400).json({msg:"failed to load"})
      }
    } catch (error) {
       res.status(500).json(error); 
    }
}

const addJob = async(req, res) =>{
    const {title, qualification, description, skill, deadline} = req.body;
    try {
        const existJob = await JobModel.findOne({qualification, description})
        if(existJob){
            res.status(400).json({msg:"Job is already available"})
        }
        else{
            const job = await new JobModel({title, qualification, description,skill, deadline})
            await job.save();
            res.status(200).json(job)
        }
    } catch (error) {
        res.status(500).json(error);
    }
}



const deleteJob = async(req, res) =>{
    const {id} = req.params;
    try {
        const job = await JobModel.findByIdAndDelete(id)
        if(job){
            res.status(200).json(job)
        }
        else{
            res.status(400).json({msg:"Failed to delete"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export {getJobs, addJob, deleteJob}