const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  domain: String,
  duration: String,
  status: { type: String, default: "Applied" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Internship", internshipSchema);