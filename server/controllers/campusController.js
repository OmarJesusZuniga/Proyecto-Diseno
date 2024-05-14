const Campus = require('../models/campusModel.js')
const AdminAssistant = require('../models/adminAssistantModel.js')
const mongoose = require('mongoose')

// Get all
const getCampuses = async (req, res) => {
    const campus = await Campus.find({}).sort({createdAt: -1})
    res.status(200).json(campus)
}

// Get a single campus
const getCampus = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such campus"})
    }
    
    const campus = await Campus.findById(id)

    if (!campus) {
        return res.status(404).json({error: "No such campus"})
    }

    res.status(200).json(campus)
}

// Create new
const createCampus = async (req, res) => {
    const {name, code} = req.body

    try {
        const campus = await Campus.create({name, code})
        res.status(200).json(campus)
    } catch (err) {
        res.status(400).json({error: err.message})
    }  
}

// Delete a campus
const deleteCampus = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such campus"})
    }
    
    const adminAssistants = await AdminAssistant.find({ campus:id })

    if (adminAssistants >  0) {
        return res.status(400).json({error: "Cannot delete the campu because it has admin assistants assigned to it"})
    }

    const campus = await Campus.findOneAndDelete({_id: id})

    if (!campus) {
        return res.status(404).json({error: "No such campus"})
    }

    res.status(200).json(campus)
}

// Update a professor
const updateCampus = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such campus"})
    }
    
    const campus = await Campus.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!campus) {
        return res.status(404).json({error: "No such campus"})
    }

    res.status(200).json(campus)
}

module.exports = {
    getCampuses,
    getCampus,
    createCampus,
    deleteCampus,
    updateCampus
}