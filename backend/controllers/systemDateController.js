const systemDate = require('../models/systemDate.js')
const mongoose = require('mongoose')

// Get all
const getDate = async (req, res) => {
    const date = await systemDate.find({}).sort({})

    
    res.status(200).json(date)
}

const updateDate = async (req, res) => {
    const { date } = req.body

    if (!date) {
        return res.status(404).json({error: "Invalid date."})
    }
    
    const system = await systemDate.findOneAndUpdate({}, {
        ...req.body
    })

    if (!system) {
        return res.status(404).json({error: "Failed to update system date."})
    }

    res.status(200).json(system)
}

module.exports = {
    getDate,
    updateDate
}