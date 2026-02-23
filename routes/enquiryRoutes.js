const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

router.post("/add-enquiry", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.json({ message: "Enquiry Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;