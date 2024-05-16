const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    employeeId:{
        type: String,
        required: true
    },
    employeename:{
        type: String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    email:{
        type:String
    },
    jobrole:{
        type: String,
        required: true
    },
    totsalary:{
        type:Number,
    },
    
    basicsalary:{
        type:Number,
    },
    bonus:{
        type:Number,
    }
   
})

module.exports = mongoose.model('Employee', employeeSchema);