const Representant = require('../models/representantModel.js')
const mongoose = require('mongoose')

// Get all
const getRepresentants = async (req, res) => {
    const representant = await Representant.find({}).sort({})

    
    res.status(200).json(representant)
}

// Get a single representant
const getRepresentant = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such representant"})
    }
    
    const representant = await Representant.findById(id)

    if (!representant) {
        return res.status(404).json({error: "No such representant"})
    }

    res.status(200).json(representant)
}

// Create new
const createRepresentant = async (req, res) => {
    const {firstLastname, secondLastname, firstname, middlename, campus} = req.body

    if (campus && !mongoose.Types.ObjectId.isValid(campus)) {
        return res.status(400).json({error: "Invalid campus id."})
    }

    try {
        const representant = await Student.create({firstLastname, secondLastname, firstname, middlename, campus})
        res.status(200).json(representant)
    } catch (err) {
        res.status(400).json({error: "Please fill in all the required fields."})
    }  
}

// Delete a representant
const deleteRepresentant = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such representant"})
    }
    
    const representant = await Representant.findOneAndDelete({_id: id})

    if (!representant) {
        return res.status(404).json({error: "No such representant"})
    }

    res.status(200).json(representant)
}

// Update a representant
const updateRepresentant = async (req, res) => {
    const {id} = req.params
    const { campus } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such professor"})
    }

    if (campus && !mongoose.Types.ObjectId.isValid(campus)) {
        return res.status(404).json({error: "Invalid campus id."})
    }
    
    const representant = await Representant.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!representant) {
        return res.status(404).json({error: "No such representant"})
    }

    res.status(200).json(representant)
}

module.exports = {
    getRepresentants,
    getRepresentant,
    createRepresentant,
    deleteRepresentant,
    updateRepresentant
}