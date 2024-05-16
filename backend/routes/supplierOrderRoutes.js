const express = require("express");
const { create, deleteOrder, getAll, getOne, update } = require("../controllers/supplierOrderCtrl");

const router = express.Router();

router.post("/create", create);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
