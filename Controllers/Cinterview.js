import dotenv from 'dotenv';
import InterviewModel from '../Models/Minterview.js';

dotenv.config();

const getInterviews = async(req, res) =>{
         const {page} = req.query;
    const limit = 10;

    try {
        const interview = await InterviewModel.find();
        if(interview){
            res.status(200).json(interview)
        }
        else{
            res.status(400).json({msg:"Failed"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
} 


const addInterview = async(req, res) =>{
    const {title, name, date} = req.body;

    try {
        const existInterview = await InterviewModel.findOne({name,date})
        if(existInterview){
            res.status(400).json({msg:"Interview already exist"})
        }
        else{
            const interview = new InterviewModel({title, name, date})
            await interview.save();
            res.status(200).json(interview)
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteInterview = async(req, res) =>{
    const {id} = req.params;

    try {
      const interview = await InterviewModel.findByIdAndDelete(id)
      if(interview){
        res.status(200).json(interview)
      }  
      else{
        res.status(400).json({msg:"failed"})
      }
    } catch (error) {
        res.status(500).json(error);
    }
}

export {getInterviews, addInterview, deleteInterview}