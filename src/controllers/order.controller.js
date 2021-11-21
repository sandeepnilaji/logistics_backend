const express = require("express");
const router = express.Router();
const Order = require("../module/order.model");

router.get("/", async (req, res) => {
  try {
    const order = await Order.find().lean().exec();
    return res.status(201).json({ order: order });
  } catch (err) {
    return res.status(400).json({ status: "error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean().exec();
    return res.status(201).json({ order: order });
  } catch (err) {
    return res.status(400).json({ status: "error" });
  }
});
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json({ order: order });
  } catch (err) {
    return res.status(400).json({ status: "error" });
  }
});

module.exports = router;
