const Image = require('../models/imageModel.js')
const mongoose = require('mongoose')

// Get a single image
const getImage = async (req, res) => {  

}

// Create new image
const createImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const image = await Image.create({img: req.file.filename})
        res.status(200).json(image)
    } catch (err) {
        res.status(400).json({error: "Failed to save file"})
    }  
}

// Delete a campus
const deleteImage = async (req, res) => {
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
const updateImage = async (req, res) => {
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
    getImage,
    createImage,
    deleteImage,
    updateImage
}