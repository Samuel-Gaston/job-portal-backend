import dotenv from 'dotenv';
import ApplicationModel from '../Models/Mapplication.js';

dotenv.config();

const getApplications = async(req, res) =>{
    try {
    const application = await ApplicationModel.find();
    if(application){
        res.status(200).json(application)
    } 
    else{
        res.status(400).json({msg:"failed to load"})
    }
    } catch (error) {
        res.status(500).json(error)
    }
}

const addApplication = async(req, res) =>{
    const {name,email, phone, qualification, skill, location,hobbies, certificate} = req.body;
    try {
        const existApplication = await ApplicationModel.findOne({name,email})
        if(existApplication){
            res.status(400).json({msg:"application already exist"});
        } 
        else{
            const application = new ApplicationModel({name, email, phone, qualification, skill, location, hobbies, certificate})
            await application.save();
            res.status(200).json(application)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteApplication = async(req, res) =>{
    const {id} = req.params;
    try {
       const application = await ApplicationModel.findByIdAndDelete(id)
       if(application){
        res.status(200).json(application)
       } 
       else{
        res.status(400).json({msg:"Failed to delete"})
       }
    } catch (error) {
        res.status(500).json(error)
    }
}

export {getApplications, addApplication, deleteApplication}