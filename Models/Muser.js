import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password: String,
    cpassword:String,
    role:String,
    isAdmin:{
        type:Boolean,
        default:false,
    },

},
    {
    timestamps:true,
    }
     );
     const UserModel = mongoose.model("user", UserSchema);

     export default UserModel;