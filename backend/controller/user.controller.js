const { validationResult } = require('express-validator');
const userModel=require('../models/user.model');
const userService=require('../services/user.service');
const blackListTokenModel = require('../models/blacklistToken.model');
module.exports.registerUser=async(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({error:error.array()});
    }
    
    const{fullname,password}=req.body;
    const hashedPassword=await userModel.hashPassword(password);
    const email = req.body.email.trim().toLowerCase();
    
    const user = await userService.createUser({
        fullname: {
          firstname: fullname.firstname,
          lastname: fullname.lastname
        },
        email,
        password: hashedPassword
      });
      
    
    const token=user.generateAuthToken();
   
    res.status(201).json({token,user});

}

module.exports.loginUser=async(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
        {
            return res.status(400).json({error:error.array()});
        } 
    
        const{email,password}=req.body;
       
        
        const user = await userModel.findOne({ email }).select("+password");
        

        if(!user){
            return res.status(401).json({message:"Invalid Email "});
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch)
        {
            return res.status(401).json({message:"Invalid Email or password"});
        }
        const token=user.generateAuthToken();
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({token,user})

}

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}
module.exports.logoutUser=async(req,res,next)=>
{
    res.clearCookie('token');
    const token=req.cookies.token||req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({token});
    res.status(200).json({message:"Logged out"});
}


