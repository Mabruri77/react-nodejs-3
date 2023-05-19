const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")
const app = express()
dotenv.config()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")

  next()
})

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)

app.use((err, req, res, next) => {
  if (err.headerSent) {
    return next(err)
  }
  res.status(err.code || 500).json({ message: err.message })
})

mongoose.connect(process.env.MONGO_URI).then((val) => {
  app.listen(5000, () => {
    console.log("app was started and database connected")
  })
})
