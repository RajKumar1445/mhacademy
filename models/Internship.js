const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  domain: { type: String, required: true },
  duration: { 
    type: String, 
    required: true,
    enum: ["1 Month", "2 Months", "3 Months"]
  },
  status: {
    type: String,
    default: "Applied",
    enum: ["Applied", "Shortlisted", "Interviewed", "Selected", "Rejected", "Completed"]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Internship", internshipSchema);