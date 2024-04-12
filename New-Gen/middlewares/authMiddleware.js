const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        // Fetch user from database using decoded ID
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).send({
            message: "User not found",
            success: false,
          });
        }
        req.user = user; // Set the user object in the request
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
