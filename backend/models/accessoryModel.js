const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  AccessoriesID: {
    type: String,
    required: true,
  },
  AccessoriesName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Price_per_unit: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
