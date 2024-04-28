const mongoose = require('mongoose')

const Schema = mongoose.Schema

const guideTeamSchema = new Schema ({
    generation: { // Código del profesor / diferente al id / NUEVO 
        type: Number, 
        required: true
    },
    students: [{ // NUEVO
        type: mongoose.Schema.Types.ObjectId, // Array de Id estudiantes
        ref: 'students',
        required: true
    }],
    representants: [{ // NUEVO
        type: mongoose.Schema.Types.ObjectId, // Array de Id representantes
        ref: 'representant',
        required: true
    }],
    adminAssistants: [{ // NUEVO
        type: mongoose.Schema.Types.ObjectId, // Array de Id asistentes adiministrativas
        ref: 'adminAssistant',
        required: true
    }],
    plan: {
        type: mongoose.Schema.Types.ObjectId, // Id del plan 
        ref: 'plans'
    },
    professors: [{ // NUEVO
        type: mongoose.Schema.Types.ObjectId, // Array de Id profesores
        ref: 'professor',
        required: true
    }]
})

module.exports = mongoose.model('guideTeam', guideTeamSchema)