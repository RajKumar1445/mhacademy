const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("DB Error:", err.message));

const enquiryRoutes = require("./routes/enquiryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api", enquiryRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});