const express = require('express');
const router = express.Router();
const Employee = require("../models/employeeModel")
const authMiddleware = require("../middlewares/authMiddleware");
const Employ = require("../models/leaveModel")
const User = require("../models/userModels");
const Leave = require("../models/leaveModel"); // Import the Leave model

router.post('/get-employee-info-by-user-id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Employee info fetched successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500)
      .send({ message: "Error getting  employee info", success: false, error });
  }
});

router.post('/get-employee-info-by-id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.body.employeeID });
    res.status(200).send({
      success: true,
      message: "Employee info fetched successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500)
      .send({ message: "Error getting  employee info", success: false, error });
  }
});

router.post('/update-employee-profile', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Employee profile updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500)
      .send({ message: "Error getting  employee info", success: false, error });
  }
});

router.post("/apply-leave", authMiddleware, async (req, res) => {
  try {
    // Generate unique employee ID
    const employeeID = generateUniqueEmployeeID(); // Assuming you have this function defined

    // Create new leave request
    const newleave = new Leave({
      ...req.body,
      employeeID: employeeID,
      status: "pending"
    });
    await newleave.save();

    // Push notification to admin
    const adminUser = await User.findOne({ isAdmin: true });
    adminUser.unseenNotifications.push({
      type: "new-leave-request",
      message: `${newleave.employeeName} (${newleave.employeeID}) has requested a leave`,
      data: { leaveId: newleave._id, employeeID: newleave.employeeID },
      onClickPath: "/admin/leaves",
    });
    await adminUser.save();

    res.status(200).send({
      success: true,
      message: "Leave request submitted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error applying leave", success: false, error });
  }
});

// Function to generate unique employee ID
function generateUniqueEmployeeID() {
  // Logic to generate a unique employee ID (e.g., combination of prefix and timestamp)
  const prefix = "EMP";
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2, 5); // Generate random string
  return `${prefix}-${timestamp}-${randomString}`;
}

router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
  try {
    const employee = await Employ.findOne({ _id: req.user._id }); // Fetching the logged-in employee
    const unseenNotifications = employee.unseenNotifications;
    const seenNotifications = employee.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    employee.unseenNotifications = [];
    employee.seenNotifications = seenNotifications;
    const updatedEmployee = await employee.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error marking notifications as seen", success: false, error });
  }
});

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const employee = await Employ.findOne({ _id: req.user._id }); // Fetching the logged-in employee
    employee.seenNotifications = [];
    employee.unseenNotifications = [];
    const updatedEmployee = await employee.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as deleted",
      data: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting notifications", success: false, error });
  }
});

router.get("/get-leaves-by-user-id", authMiddleware, async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user._id });
    res.status(200).send({
      message: "Leaves fetched successfully",
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching leaves", success: false, error });
  }
});

module.exports = router;
