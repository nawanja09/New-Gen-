const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  repairtype: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description:{
    type: String,
  },
  dodate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  fixedIssues: {
    type: String,
    default: 'Pending'
  },
  repairAmount: {
    type: Number,
    
  },
  repairPartsAmount: {
    type: Number,
    
  },
  totalAmount: {
    type: Number,
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
