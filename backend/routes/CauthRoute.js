const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  testController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  updateProfileController
} = require("../controllers/CauthController.js");


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test",  testController);

//protected User route auth
router.get("/user-auth", (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile",  updateProfileController);

//orders
router.get("/orders", getOrdersController);

//all orders
router.get("/all-orders", getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  
  orderStatusController
);

module.exports = router;
