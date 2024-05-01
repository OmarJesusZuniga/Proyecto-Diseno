const Image = require('../models/imageModel.js')
const mongoose = require('mongoose')

// Get a single image
const getImage = async (req, res) => {  
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such file"})
    }
    
    const image = await Image.findById(id)

    if (!image) {
        return res.status(404).json({error: "No such file"})
    }

    res.status(200).json(image)
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
        return res.status(404).json({error: "No such file"})
    }
    
    const image = await Image.findOneAndDelete({_id: id})

    if (!image) {
        return res.status(404).json({error: "No such image"})
    }

    res.status(200).json(image)
}


module.exports = {
    getImage,
    createImage,
    deleteImage
}