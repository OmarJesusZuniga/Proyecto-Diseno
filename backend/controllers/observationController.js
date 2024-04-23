const Observation = require('../models/observationModel')
const mongoose = require('mongoose')

const errorMessage = 'No such plan'

const getObservations = async (req, res) => {
  const observation = await Observation.find({}).sort({createdAt: -1})

  res.status(200).json(observation)
}

const getObservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: errorMessage})
  }

  const observation = await Observation.findById(id).populate('comments');

  if (!observation) {
    return res.status(404).json({error: errorMessage})
  }

  res.status(200).json(observation)
}

const createObservation = async (req, res) => {
  const {text} = req.body

  if (!text) {
    return res.status(400).json({ error: 'Please fill the text field'})
  }

  // add to the database
  try {
    const observation = await Observation.create({ title, load, reps })
    res.status(200).json(observation)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteObservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: errorMessage})
  }

  const observation = await Observation.findOneAndDelete({_id: id})

  if(!observation) {
    return res.status(400).json({error: errorMessage})
  }

  res.status(200).json(observation)
}

const updateObservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: errorMessage})
  }

  const observation = await Observation.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!observation) {
    return res.status(400).json({error: errorMessage})
  }

  res.status(200).json(observation)
}

module.exports = {
  getObservations,
  getObservation,
  createObservation,
  deleteObservation,
  updateObservation
}