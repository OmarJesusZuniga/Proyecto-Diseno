const mongoose = require('mongoose') 

const Schema = mongoose.Schema

const studentSchema = new Schema ({
    studentCard: {
        type: Number,
        required: true
    }, 
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
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    campus: {
        type: mongoose.Schema.Types.ObjectId, // Id del campus
        ref: 'campus' 
    }
})

module.exports = mongoose.model('student', studentSchema)