const mongoose = require('mongoose')

const Schema = mongoose.Schema

const professorSchema = new Schema ({
    profesor: [{ 
        type: mongoose.Schema.Types.ObjectId, // Id a sus atributos de profesor
        ref: 'professor'
    }]
}, {timestamps:true})

module.exports = mongoose.model('guideProfessor', professorSchema)