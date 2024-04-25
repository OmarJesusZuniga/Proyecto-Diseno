const Student = require('../models/professorModel.js')
const mongoose = require('mongoose')

// Get all
const getProfessors = async (req, res) => {
    const professor = await Professor.find({}).sort({})

    
    res.status(200).json(professor)
}

// Get a single professor
const getProfessor = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such professor"})
    }
    
    const professor = await Professor.findById(id)

    if (!professor) {
        return res.status(404).json({error: "No such professor"})
    }

    res.status(200).json(professor)
}

// Create new
const createProfessor = async (req, res) => {
    const {code, firstLastname, secondLastname, firstname, middlename, email, officeNumer, phoneNumber, campus, image} = req.body

    if (!mongoose.Types.ObjectId.isValid(officeNumer)) {
        return res.status(400).json({error: "Invalid office number."})
    }

    try {
        const professor = await Student.create({code, firstLastname, secondLastname, firstname, middlename, email, officeNumer, phoneNumber, campus, image})
        res.status(200).json(professor)
    } catch (err) {
        res.status(400).json({error: "Please fill in all the required fields."})
    }  
}

// Delete a professor
const deleteProfessor = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such professor"})
    }
    
    const professor = await Professor.findOneAndDelete({_id: id})

    if (!professor) {
        return res.status(404).json({error: "No such professor"})
    }

    res.status(200).json(professor)
}

// Update a professor
const updateProfessor = async (req, res) => {
    const {id} = req.params
    const { officeNumber } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such professor"})
    }

    if (!mongoose.Types.ObjectId.isValid(officeNumber)) {
        return res.status(404).json({error: "Invalid office number."})
    }
    
    const professor = await Professor.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!professor) {
        return res.status(404).json({error: "No such professor"})
    }

    res.status(200).json(professor)
}

module.exports = {
    getProfessors,
    getProfessor,
    createProfessor,
    deleteProfessor,
    updateProfessor
}