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
    }]
}, { timestamps: true })

module.exports = mongoose.model('observation', activitiesSchema)