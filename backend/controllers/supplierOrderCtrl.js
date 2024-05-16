const Order = require("../models/supplierOrderModel");

const create = async (req, res) => {
    try {
        const orderData = new Order(req.body);

        await orderData.save();
        res.status(200).json({ msg: "Order created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const orderData = await Order.find();
        res.status(200).json(orderData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const orderExist = await Order.findById(id);
        if (!orderExist) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.status(200).json(orderExist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        await Order.findByIdAndDelete(id);
        res.status(200).json({ msg: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { create, getAll, getOne, update, deleteOrder };
