const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:25,
    },
    phone:{
        type:String,
        required:true,
        max:10,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        min:5,
    },
})

module.exports = mongoose.model("Customers",customerSchema)