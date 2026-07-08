const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.use(auth);
router.use(admin);

router.get("/revenue", async (req, res) => {
  const result = await Order.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  res.json(result[0] || { total: 0 });
});

router.get("/monthly-sales", async (req, res) => {
  const data = await Order.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$amount" }
      }
    }
  ]);
  res.json(data);
});

router.get("/top-customers", async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: "$customerName",
          total: { $sum: "$amount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
