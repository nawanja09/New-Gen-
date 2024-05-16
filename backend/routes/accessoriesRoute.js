const express = require("express");
const router = express.Router();
const accessoriesController = require("../controllers/accessoriesController");

router.get("/getAccessoryById:id", accessoriesController.getAccessoryById);
router.patch("/updateAccessory:id", accessoriesController.updateAccessory);
router.delete("/deleteAccessory:id", accessoriesController.deleteAccessory);
router.get("/getAllAccessories", accessoriesController.getAllAccessories);
router.post("/createAccessory", accessoriesController.createAccessory);

module.exports = router;
