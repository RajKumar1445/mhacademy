require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err))

// Import Models
const Payment = require('./models/Payment')
const Internship = require('./models/Internship')

// PAYMENT API
app.post('/api/payment', async (req,res)=>{
  try{
    const payment = new Payment(req.body)
    await payment.save()
    res.json({message:"Payment Saved Successfully"})
  }catch(err){
    res.status(500).json({error:err.message})
  }
})

// INTERNSHIP API
app.post('/api/internship', async (req,res)=>{
  try{
    const internship = new Internship(req.body)
    await internship.save()
    res.json({message:"Internship Saved Successfully"})
  }catch(err){
    res.status(500).json({error:err.message})
  }
})

app.listen(process.env.PORT, ()=>{
  console.log("Server running on port", process.env.PORT)
})

const Enquiry = require('./models/Enquiry')

app.post('/api/enquiry', async (req,res)=>{
  try{
    const enquiry = new Enquiry(req.body)
    await enquiry.save()
    console.log("Enquiry Saved:", enquiry)
    res.json({message:"Enquiry Submitted Successfully"})
  }catch(err){
    console.log(err)
    res.status(500).json({error:err.message})
  }
})