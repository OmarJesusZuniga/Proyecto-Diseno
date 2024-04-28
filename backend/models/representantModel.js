const mongoose = require('mongoose')

const Schema = mongoose.Schema

const representantSchema = new Schema ({
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
    campus: { // NUEVO
        type: mongoose.Schema.Types.ObjectId, // Id campus
        ref: 'campus'
    }
})

module.exports = mongoose.model('representant', representantSchema)