const mongoose = require('mongoose')

const Schema = mongoose.Schema

const campusSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps:true})

module.exports = mongoose.model('campus', campusSchema)