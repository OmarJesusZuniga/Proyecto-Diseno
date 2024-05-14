const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activitiesSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        required: true
    }], 
    professor: {
        type: mongoose.Schema.Types.ObjectId, // Id del profesor guia
        ref: 'professor' 
    }
}, { timestamps: true })

module.exports = mongoose.model('comment', activitiesSchema)