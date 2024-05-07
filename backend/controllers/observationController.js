const Observation = require('../models/observationModel')
const Activity = require('../models/activityModel')
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
  const {text, professor, idActivity} = req.body

  if (!text) {
    return res.status(400).json({ error: 'Please fill the text field'})
  }

  // add to the database
  try {
    const id = professor._id
    const activity = await Activity.findById(activityId); // Ensure you use the correct field name
    if (!activity) {
     return res.status(404).json({ error: 'Activity not found' });
    }
    const observation = await Observation.create({ text, id, comments: [] })

    activity.observations.push(observation._id);
    await activity.save();

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