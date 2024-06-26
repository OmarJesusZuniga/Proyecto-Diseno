const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminAssistantSchema = new Schema ({
    firstLastname: {
        type: String,
        required: true
    },
    secondLastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: false
    },
    campus: { 
        type: mongoose.Schema.Types.ObjectId, // Id del campus
        ref: 'campus' 
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: Number,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('adminassistants', adminAssistantSchema)