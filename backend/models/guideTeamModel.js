const mongoose = require('mongoose')

const Schema = mongoose.Schema

const guideTeamSchema = new Schema ({
    generation: { // Código del profesor / diferente al id / NUEVO 
        type: Number, 
        required: true
    },
    guideProfessor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professor'
    },
    students: [{ // NUEVO
        type: mongoose.Schema.Types.ObjectId, // Array de Id estudiantes
        ref: 'student',
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
}, {timestamps:true})

module.exports = mongoose.model('guideTeam', guideTeamSchema)