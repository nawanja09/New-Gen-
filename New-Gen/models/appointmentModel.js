const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    employeeID: {
        type: String,
        required: true
    },
    employeeInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
},{
    timestamps:true,
});
const appointmentModel = mongoose.model("appointments",appointmentSchema);
 module.exports = appointmentModel;