const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  employeename: {
    type: String,
    required: true,
  },
  jobrole:{
    type:String,
    required:true
  },
  leaveType: {
    type: String,
    required: true,
  },
  leavefrom: {
    type: Date, 
    required: true,
  },
  leaveto: {
    type: Date, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum:['pending','Approved','Rejected'], // Corrected enum values
    default: "pending",
  }
});

module.exports = mongoose.model('Leave', leaveSchema);
