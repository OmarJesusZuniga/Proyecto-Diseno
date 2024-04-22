const mongoose = require('mongoose')

const Schema = mongoose.Schema

const professorSchema = new Schema ({
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
        type: [Number], // Id de los campus
        required: true
    }
})

module.exports = mongoose.model('professor', professorSchema)