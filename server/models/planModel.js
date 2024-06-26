const mongoose = require('mongoose')
const activities = require('./activityModel')

const Schema = mongoose.Schema

const planSchema = new Schema ({
    professor: {
        type: mongoose.Schema.Types.ObjectId, // Id del profesor guia
        ref: 'professor' 
    }, 
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'activity',
        required: true
    }]
}, {timestamps:true})

module.exports = mongoose.model('plan', planSchema)