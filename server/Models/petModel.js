const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    petType:{
        type:String,
        required:true
    },
    petName:{
        type: String,
        required: true
    },
    petBreed:{
        type: String,
        required: true
    },
    avatar:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model("Pets",petSchema)