const userModel=require('../models/user.model');


module.exports.createUser = async ({ fullname, email, password }) => {
    if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
      throw new Error("All fields are required");
    }
  
    const user = new userModel({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email,
      password
    });
  
    await user.save();
    return user;
  };
  
