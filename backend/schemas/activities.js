const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activitiesSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number, // 1 Orientadora, 2 motivacionales, ...
        required: true
    }, 
    week: {
        type: Number,
        required: true
    },
    programmedDate: {
        type: Date,
        required: true
    },
    managers: {
        type: [Number], // Array de Ids de los profesores
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    reminders: {
        type: [Date],
        required: true
    },
    modality: {
        type: Number, // 1: presencial 2: remota
        required: true
    },
    link: {
        type: String, // Link al zoom
        required: false
    },
    modality: {
        type: Number, // 1: presencial 2: remota
        required: true
    }, /*
    pdf: {              // Creo que esto no se ocupa porque se podria generar cuando se pida 
        type: String,   // No estoy muy seguro de como se guardaria, vi que se usa GridFs
        required: false 
    }*/
    state: {
        type: Number, // Id al tipo de estado 
        required: true
    },
    observations: {
        type: Number, // Id a un documento de comentarios? O array de strings aqui mismo?
        required: true
    },
    comments: {
        type: Number, // Id a un documento de comentarios? O array de strings aqui mismo?
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('activities', activitiesSchema)