const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: true
    },
    accessoriesname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;