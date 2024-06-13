const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema ({
    text: {
        type: String,
        required: true
    }, 
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    state: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('notification', notificationSchema)