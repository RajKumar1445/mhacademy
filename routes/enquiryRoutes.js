const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.json({ message: "Enquiry Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving enquiry" });
  }
});

module.exports = router;
