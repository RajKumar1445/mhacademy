const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.json({ message: "Payment Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving payment" });
  }
});

module.exports = router;