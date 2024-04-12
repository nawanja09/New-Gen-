const mongoose = require("mongoose");
const addSchema = new mongoose.Schema(

{
    userId:{
        type:String,
        required:true,
    },
    employeeID:{
        type:String,
        required:true,
    },

    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    jobRole:{
        type:String,
        required:true,
    },
    workExperience:{
        type:String,
        required:true,
    },
    qualifications:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:"pending"
    }

},
{
    timestamps:true,
}

);


const employeeModel = mongoose.model("applyemployee",addSchema);
module.exports = employeeModel;