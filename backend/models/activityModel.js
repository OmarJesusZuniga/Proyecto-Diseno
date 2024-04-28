const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activitiesSchema = new Schema ({
    week: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: { // Creo que puede ser buena idea hacer una clase que guarde estos tipos (mas escalable y siempre son valores validos)
        type: String, // 1 Orientadora, 2 motivacionales, ...
        enum: ['Orientadoras', 'Motivacionales', 'De apoyo a la vida estudiantil', 'De orden técnico', 'De recreación'], // Valores validos
        default: 'Orientadoras', 
        required: true
    }, 
    programmedDate: {
        type: Date,
        required: true
    },
    managers: [{ // Cambio a lista de Id profes
        type: Schema.Types.ObjectId,
        ref: 'professor',
        required: true
    }],
    publishDate: {
        type: Date,
        required: true
    },
    reminders: {
        type: [Date],
        required: false
    },
    modality: {
        type: String,
        enum: ['Presencial', 'Remota'],
        default: 'Presencial',
        required: true
    },
    link: {
        type: String, // Link al zoom
        required: false
    }, 
    /*
    pdf: {              // Creo que esto no se ocupa porque se podria generar cuando se pida 
        type: String,   // No estoy muy seguro de como se guardaria, vi que se usa GridFs
        required: false // Creo que mas bien es un pdf que dice que es la actividad (algo por el estilo )
    }*/
    state: {
        type: Schema.Types.ObjectId,
        ref: 'activityState',
    },
    observations: [{ 
        type: Schema.Types.ObjectId,
        ref: 'observation',
        required: true
    }]
}, { timestamps: true })

module.exports = mongoose.model('activity', activitiesSchema)