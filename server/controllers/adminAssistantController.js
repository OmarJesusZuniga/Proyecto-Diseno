const AdminAssistant = require('../models/adminAssistantModel.js')
const mongoose = require('mongoose')

// /api/adminAssistants/:id

// Get all
const getAdminAssistants = async (req, res) => {
    
    const adminAssistant = await AdminAssistant.find({})

    
    res.status(200).json(adminAssistant)
}

// Get a single adminAssistant
const getAdminAssistant = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such admin assistant"})
    }
    
    const adminAssistant = await AdminAssistant.findById(id)

    if (!adminAssistant) {
        return res.status(404).json({error: "No such admin assistant"})
    }

    res.status(200).json(adminAssistant)
}

//Get by name and password
const getAdminAssistantNamePassword = async (req, res) => {

    const {name, password} = req.body;
    console.log(req.body)
    const query = {
        firstname: name,
        password: parseInt(password)
    }

    try {
        const queryResult =  await AdminAssistant.find(query)
       
        if (queryResult){
            res.status(200).json(queryResult)
        }
    } catch (e){
        res.status(404)
    }
}

// Create new
const createAdminAssistant = async (req, res) => {
    const {firstLastname, secondLastname, firstname, middlename, campus} = req.body

    if (campus && !mongoose.Types.ObjectId.isValid(campus)) {
        return res.status(400).json({error: "Invalid campus id."})
    }

    try {
        const adminAssistant = await AdminAssistant.create({firstLastname, secondLastname, firstname, middlename, campus})
        res.status(200).json(professor)
    } catch (err) {
        res.status(400).json({error: "Please fill in all the required fields."})
    }  
}

// Delete a professor
const deleteAdminAssistant = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such admin assistant"})
    }
    
    const adminAssistant = await AdminAssistant.findOneAndDelete({_id: id})

    if (!adminAssistant) {
        return res.status(404).json({error: "No such admin assistant"})
    }

    res.status(200).json(adminAssistant)
}

// Update a professor
const updateAdminAssistant = async (req, res) => {
    const {id} = req.params
    const { campus } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such admin assistant"})
    }

    if (campus && !mongoose.Types.ObjectId.isValid(campus)) {
        return res.status(404).json({error: "Invalid campus id."})
    }
    
    const adminAssistant = await AdminAssistant.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!adminAssistant) {
        return res.status(404).json({error: "No such admin assistant"})
    }

    res.status(200).json(adminAssistant)
}

module.exports = {
    getAdminAssistants,
    getAdminAssistant,
    getAdminAssistantNamePassword,
    createAdminAssistant,
    deleteAdminAssistant,
    updateAdminAssistant
}