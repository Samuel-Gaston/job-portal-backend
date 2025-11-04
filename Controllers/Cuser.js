import UserModel from "../Models/Muser.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



const genJWT = (id, name, email, isAdmin) =>{
     const Token = jwt.sign({id, name, email, isAdmin}, process.env.Jwtsecret, {
        expiresIn:"30d"
     });
     return Token;
};

 



const getUsers = async(req, res) => {
  const {page} = req.query;
  const limit = 10;
  try {
    const users = await UserModel.find().skip(page-1).limit(limit);
    if(users.length < limit){
      res.status(200).json({msg:"loaded all data", data: users});
    }
    else{
      res.status(200).json(users);
    }
   
  } catch (error) {
    res.status(500).json(error)
  }
};



const addUser = async(req, res) =>{
   const { name, email, password, cpassword, role} = req.body;
   try {
    const existEmail = await UserModel.findOne({email});
  if(existEmail){
    res.status(400).json({ msg: "Error. this user already exist."});
  }
  else{
   
    const user = new UserModel({name, email, password, cpassword, role});
    await user.save();
  const Token =  genJWT(user._id, user.name, user.email, user.isAdmin);
  res.cookie("JobToken", Token)
  res.status(201).json({msg:"Success. your have successfully sign-up."});
  }   
   } catch (error) {
    res.status(500).json(error);
   }
}



const authUser = async(req, res) =>{
  const { email, password} = req.body;
  try {
    const existUser = await UserModel.findOne({email});
    if(existUser){
      
            const Token =  genJWT(existUser._id, existUser.name, existUser.email, existUser.isAdmin);
        res.cookie("JobToken", Token);
        res.status(200).json({msg:"Success. your have successfully sign-in.",data:{name:existUser.name,email:existUser.email}});
         }
   else{
        res.status(400).json({msg:"Error. Invalid email or password."});
    }
  } catch (error) {
    res.status(500).json({msg:"error"});
  }
};



const deleteUser = async(req, res) =>{
    const {id} = req.params;
    const decode = jwt.decode(req.cookies.JobToken);
     try {
   if(decode.isAdmin || decode.id === id){
    const user = await UserModel.findByIdAndDelete(id)
    if(user){
     res.status(200).json({msg:"deleted user!!"})
    }
   else {
     res.status(404).json({msg:"user deleted already!!"})
   }
   }
   else{
    res.status(403).json({msg:"you are not authorised to delete this user"});
   }     
     } catch (error) {
        res.status(500).json(error);
     }
}






export { getUsers, addUser, authUser,deleteUser };