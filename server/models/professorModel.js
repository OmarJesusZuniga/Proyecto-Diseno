const mongoose = require('mongoose')

const Schema = mongoose.Schema

const professorSchema = new Schema ({
    code: { // Código del profesor / diferente al id / NUEVO 
        type: String, 
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
    officeNumber: { // Número de teléfono en la oficina con formato NNNN-NNNN / NUEVO  
        type: Number,  
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    campus: { // NUEVO
        type: mongoose.Schema.Types.ObjectId, // Array de Id campus
        ref: 'campus'
    },
    password: {
        type: Number,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image'
    }
    

}, {timestamps:true})

module.exports = mongoose.model('professor', professorSchema)