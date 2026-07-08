const express = require("express");
const Order = require("../models/Order");

module.exports = (io) => {
  const router = express.Router();

  // Create a new order
  router.post("/", async (req, res) => {
    try {
      const order = await Order.create(req.body);
      io.emit("newOrder");
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Bulk create orders
  router.post("/bulk", async (req, res) => {
    try {
      const orders = await Order.insertMany(req.body);
      io.emit("newOrder");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all orders
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get order count
  router.get("/count", async (req, res) => {
    try {
      const count = await Order.countDocuments();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get recent orders (last 5)
  router.get("/recent", async (req, res) => {
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Test endpoint
  router.get("/test", async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
      res.json({
        success: true,
        count: orders.length,
        orders: orders
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};