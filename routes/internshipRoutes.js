const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");

router.post("/", async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.json({ message: "Internship Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving internship" });
  }
});

module.exports = router;