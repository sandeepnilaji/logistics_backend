const express = require("express");
const router = express.Router();

const User = require("../module/user.model");
var bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().populate("orders").exec();
    return res.status(201).json({ user: user });
  } catch (err) {
    return res.status(400).json({ status: "error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    return res.status(201).json({ user: user });
  } catch (err) {
    return res.status(400).json({ status: "error" });
  }
});

router.patch("/:id", async (req, res) => {
  var password = req.body.password;
  if (!password) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      return res.status(201).json({ user: user });
    } catch (err) {
      return res.status(400).json({ status: "error" });
    }
  } else {
    const hash = bcrypt.hashSync(password, 8);
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          password: hash,
        },
        { new: true }
      )
        .lean()
        .exec();
      return res.status(201).json({ user: user });
    } catch (err) {
      return res.status(400).json({ status: "error" });
    }
  }
});

router.put("/orderuser/:id", async (req, res) => {
  try {
    const user = User.findByIdAndUpdate(req.params.id, {
      $push: { orders: req.body.orders },
    }).exec();
    return res.status(201).json({ user: user });
  } catch (err) {
    return res.status(400).json({ status: "error" });
  }
});

module.exports = router;
