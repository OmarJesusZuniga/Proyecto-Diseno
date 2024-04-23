const mongoose = require('mongoose')
const activities = require('./activityModel')

const Schema = mongoose.Schema

const planSchema = new Schema ({
    guideProfessor: {
        type: mongoose.Schema.Types.ObjectId, // Id del profesor guia
        ref: 'guideProfessor' 
    }, 
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'activity',
        required: true
    }]
})

module.exports = mongoose.model('plan', planSchema)