const mongoose = require('mongoose')

const Schema = mongoose.Schema

const observationSchema = new Schema ({
    text: {
        type: String,
        required: true
    }, 
    professor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'professor' 
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, { timestamps: true })

module.exports = mongoose.model('observation', observationSchema)