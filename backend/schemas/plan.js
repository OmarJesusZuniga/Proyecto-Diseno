const mongoose = require('mongoose')
const activities = require('./activities')

const Schema = mongoose.Schema

const planSchema = new Schema ({
    guideProfessor: {
        type: Number, // Id
        required: true
    }, 
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'Activities',
        required: true
    }]
})

module.exports = mongoose.model('plan', planSchema)