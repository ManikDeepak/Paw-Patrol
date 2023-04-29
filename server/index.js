// importing libraries
const express = require("express")
const cors =  require("cors")
const mongoose = require("mongoose")
const userRoutes = require('./Routes/userRoutes')
const emailRoutes = require('./Routes/emailRoutes')
const petRoutes = require('./Routes/petRoutes')
// initialising backend app
const app = express()
require("dotenv").config()

//adding dependencies to the app
app.use(cors())
app.use(express.json())

// using API routes
app.use("/api/auth",userRoutes)
app.use("/api",emailRoutes)
app.use("/api",petRoutes)

//setting up database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Database is connected")
}).catch((err) => {
    console.log(err.message)
})

// starting the app
const server = app.listen(process.env.PORT, () =>{
    console.log(`Server started at port ${process.env.PORT}\n http://localhost:${process.env.PORT}`)
})

app.get('/',(req,res) => res.send("Server works"))
