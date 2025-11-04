import dotenv from 'dotenv';
import AdminModel from '../Models/Madmin.js';
import bcrypt from 'bcrypt';
dotenv.config();


const getAdmin = async(req, res) =>{
    try {
      const admin = await AdminModel.find();
      res.status(200).json(admin)  
    } catch (error) {
        res.status(500).json(error)
    }
}

const addAdmin = async(req, res) =>{
    const {email, password} = req.body;
    try {
        const existAdmin = await AdminModel.findOne({email})
        if(existAdmin){
            res.status(400).json({msg:"Admin already exist"})
        }
        else{
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)
        const admin = new AdminModel({email, password:hashpassword})
        await admin.save();
        res.status(200).json({msg:"successs"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const authAdmin = async(req, res) =>{
    const {email, password} = req.body;
    try {
     const admin = await AdminModel.findOne({email});
     if(admin){
        const isvalid = await bcrypt.compare(password, admin.password)
     if(isvalid){
           res.json({msg:"Success. admin sign-in successfully"})
     }
     else{
        res.status(400).json({msg:"invalid email or password"})
     }
     }   
     else{
        res.status(400).json({msg:"invalid email or password"})
     }
    } catch (error) {
        res.status(500).json({msg:"error"});
    }
}


export  {addAdmin, authAdmin, getAdmin};

