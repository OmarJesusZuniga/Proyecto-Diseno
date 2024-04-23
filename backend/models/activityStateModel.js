const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activityStateSchema = new Schema ({
    type: {
        type: String,
        enum: ['Planeada', 'Notificada', 'Realizada', 'Cancelada'], // Valores validos
        default: 'Planeada', 
        required: true
    }, 
    imageCollection: [{ // . Una colección de imágenes
        type: Schema.Types.ObjectId,
        ref: 'image',
        required: true
    }],  
    evidence: { // Una imagen de los participantes...
        type: Schema.Types.ObjectId,
        ref: 'image',
        required: false
    },  
    recordingLink: {
        type: String, 
        required: false
    }
})

module.exports = mongoose.model('activityState', activityStateSchema)