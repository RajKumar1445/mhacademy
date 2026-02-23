const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  programType: { type: String, required: true, enum: ["Course", "Internship"] },
  courseName: String,
  internshipDuration: { type: String, enum: ["1 Month", "2 Months", "3 Months"] },
  paymentMethod: { type: String, enum: ["UPI", "Card", "NetBanking"] },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Payment", paymentSchema);