const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const generateOrderId = () => "ORD" + Date.now().toString().slice(-6);

router.post("/", async (req, res) => {
  try {
    const { name, address, phone, productId } = req.body;
    const orderId = generateOrderId();
    const newOrder = new Order({ name, address, phone, productId, orderId });
    await newOrder.save();
    res.status(201).json({ message: "Order placed", orderId });
  } catch {
    res.status(500).json({ error: "Failed to place order. Please try again later." });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch {
    res.status(500).json({ error: "Tracking failed" });
  }
});

module.exports = router;
