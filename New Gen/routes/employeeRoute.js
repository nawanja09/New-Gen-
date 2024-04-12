const express=require("express");
const router = express.Router();
const Employee=require("../models/employeeModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/get-employee-info-by-user-id', authMiddleware, async (req, res) => {

    try {
      const employee = await Employee.findOne({ userId: req.body.userId });
      res.status(200).send({
        success:true,
        message:"Employee info fetched successfully",
        data: employee
      })
    } catch (error) {
      console.log(error);
      res.status(500)
        .send({ message: "Error getting employee info", success: false, error });
    }
  });
  router.post('/update-employee-profile', authMiddleware, async (req, res) => {
  
      try {
        const employee = await Employee.findOneAndUpdate({ userId: req.body.userId },req.body);
        res.status(200).send({
          success:true,
          message:"Employee info updated successfully",
          data: employee
        })
      } catch (error) {
        console.log(error);
        res.status(500)
          .send({ message: "Error getting employee info", success: false, error });
      }
    });


  module.exports=router;