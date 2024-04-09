const express = require('express');
const router = express.Router();
const User = require("../models/userModels");
const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});
router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {

  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }


  } catch (error) {
    res.status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});
router.post("/apply-employee-account", authMiddleware, async (req, res) => {
  try {
    const newemployee = new Employee({ ...req.body, status: "pending" });
    await newemployee.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications
    unseenNotifications.push({
      type: "new-employee-request",
      message: `${newemployee.firstName} has applied`,
      data: {
        userId: newemployee._id,
        name: newemployee.firstName
      },
      onClickPath: "/admin/employeelist"
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Employee request submitted successfully",
    });


  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Error applying employee", success: false, error });
  }
});
router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId});
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotification;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications=[];
    user.seenNotification = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
         success:true,
         message:"All notifications marked as seen",
         data:updatedUser,
    });
 
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Error applying employee", success: false, error });
  }
});
router.post("/delete-all-notifications",authMiddleware, async (req, res) => {
  try {
   const user = await User.findOne({_id: req.body.userId});
  user.seenNotification = [];
  user.unseenNotifications = [];
  const updatedUser = await user.save();
  updatedUser.password = undefined;
   res.status(200).send({
        success:true,
        message:"All notifications mark as deleted",
        data:updatedUser,
   });
  } catch (error) {
    console.log(error)
    res
      .status(500)  
      .send({ message: "Error applying leave", success: false, error });
  }
});

module.exports = router;