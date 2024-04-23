const ActivityState = require('../models/activityStateModel')
const mongoose = require('mongoose')

const errorMessage = 'No such activity state';

const getActivityStates = async (req, res) => {
  const ActivityStates = await ActivityState.find({}).sort({createdAt: -1})

  res.status(200).json(ActivityStates)
}

const getActivityState = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: errorMessage})
  }

  const state = await ActivityState.findById(id).populate('activities');

  if (!state) {
    return res.status(404).json({error: errorMessage})
  }

  res.status(200).json(state)
}

const createActivityState = async (req, res) => {
  const newState = await State.create({
    type: 'Planeada'
  })

  if (!newState) {
    return res.status(404).json({error: 'Could not create State for Activity'})
  }
};

const deleteActivityState = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: errorMessage})
  }

  const state = await ActivityState.findOneAndDelete({_id: id})

  if(!state) {
    return res.status(400).json({error: errorMessage})
  }

  res.status(200).json(state)
}

const updateActivityState = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: errorMessage})
  }

  const state = await ActivityState.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!state) {
    return res.status(400).json({error: errorMessage})
  }

  res.status(200).json(state)
}

module.exports = {
  getActivityStates,
  getActivityState,
  createActivityState,
  deleteActivityState,
  updateActivityState
}