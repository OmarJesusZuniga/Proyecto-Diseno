const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activityStateSchema = new Schema ({
    type: {
        type: Number, // 1 Planeada, 2 Notificada, ...
        required: true
    }, 
    attendence: {       // Tambien se puede hacer un schema por cada tipo 
        type: [Number], // Id de las imagenes 
        required: false
    },  
    evidence: {
        type: [Number], // Id de las imagenes 
        required: false
    },  
    recordingLink: {
        type: String, 
        required: false
    },
    observations: {
        type: Number, // Id a un documento de comentarios? O array de strings aqui mismo?
        required: true // Creo que clase de comentarios, ya que tienen respuestas
    },
    cancelationDate: {
        type: Date, 
        required: true
    }
})

module.exports = mongoose.model('activityState', activityStateSchema)