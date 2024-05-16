const Accessory = require("../models/accessoryModel");

exports.getAccessoryById = async (req, res, next) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }
    res.json(accessory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAccessory = async (req, res, next) => {
  try {
    const accessory = await Accessory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!accessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }
    res.json(accessory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAccessory = async (req, res, next) => {
  try {
    const accessory = await Accessory.findByIdAndDelete(req.params.id);
    if (!accessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }
    res.json({ message: "Accessory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAccessories = async (req, res, next) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAccessory = async (req, res, next) => {
  try {
    const accessory = new Accessory(req.body);
    await accessory.save();
    res.status(201).json(accessory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
