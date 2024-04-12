const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const Employee = require('../models/employeeModel');
const Leave = require('../models/leaveModel')
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/get-all-employees", authMiddleware, async (req, res) => {
    try {
     const employees = await Employee.find({});
     res.status(200).send({
          message:"Employees fetched successfully",
          success:true,
          data:employees,
     });
    } catch (error) {
      console.log(error)
      res
        .status(500)  
        .send({ message: "Error applying employee", success: false, error, });
    }
  });
  router.get("/get-all-users", authMiddleware, async (req, res) => {
    try {
     const employees = await User.find({});
     res.status(200).send({
          success:true,
          message:"Users fetched successfully",
          data:employees,
     });
    } catch (error) {
      console.log(error)
      res
        .status(500)  
        .send({ message: "Error applying employee", success: false, error, });
    }
  });

  router.post("/change-employee-account-status", authMiddleware, async (req, res) => {
    try {
      const{employeeID,status} = req.body;
     const employee = await Employee.findByIdAndUpdate(employeeID,{
      status,
    });
     const user =await User.findOne({_id:employee.userId});
     const unseenNotifications = user.unseenNotifications;
     unseenNotifications.push({
        type:"new-employee-request-changed",
        message: `Your employee account has been ${status}`,
        onClickPath:"/notifications",
     });
     user.isEmployee = status==="approved"? true:false;
     await user.save();
     res.status(200).send({
      message:"Employee status updated successfully",
      success:true,
      data:employee,
 });
    } catch (error) {
      console.log(error)
      res
        .status(500)  
        .send({ message: "Error applying employee", success: false, error, });
    }
  });

module.exports = router;