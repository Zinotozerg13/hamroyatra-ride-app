const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema =new mongoose.Schema({
    fullname:
    {
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Minimum length required firstname"]
        },
        lastname:{
            type:String,
            minlength:[3,"Minimum length required for lastname"]
        }
    },
    email:
    {
        type:String,
        required:true,
        minlength:[7,"Minimum length required for email"]
    },
    password:
    {
        type:String,
        required:true,
        select:false
      
    },

    socketId:{
        type:String
    }
})
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_secret,{expiresIn:'24h'})
    return token;
}
userSchema.methods.comparePassword=async function(password)
{
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);

}
const userModel = mongoose.model("User", userSchema, "users"); // Ensure "users" matches MongoDB
module.exports=userModel;