const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
 /* employeeID: {
    type: String,
    required: true,
    unique: true,
  },*/

  userId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  duration: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  }
}, {
  timestamps: true,
});

const leaveModel = mongoose.model("leaves", employeeSchema);
module.exports = leaveModel;
