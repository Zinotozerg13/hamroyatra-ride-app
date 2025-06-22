const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const  captainSchema=new mongoose.Schema({
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
    //for live tracking
    socketId:{
        type:String
    },
   
    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    },

    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})
captainSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
} 
captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword=async function(password)
{
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('Captain', captainSchema)


module.exports = captainModel;