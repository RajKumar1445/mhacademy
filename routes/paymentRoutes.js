const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  programType: String,
  courseName: String,
  internshipDuration: String,
  paymentMethod: String,
  amount: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);