const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required: true
    },
    outlet:{
        type: String,
        required: true
    },service:{
        type: String,
        required: true
    },
    petName:{
        type: String,
        required: true
    },price:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Appointment",appointmentSchema)