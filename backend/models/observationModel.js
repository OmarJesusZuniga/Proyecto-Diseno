const mongoose = require('mongoose')

const Schema = mongoose.Schema

const observationSchema = new Schema ({
    text: {
        type: String,
        required: true
    }, 
    profesor: {
        type: mongoose.Schema.Types.ObjectId, // Id del profesor guia
        ref: 'professor' 
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, { timestamps: true })

module.exports = mongoose.model('observation', observationSchema)