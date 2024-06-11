const Activity = require('../models/activityModel')
const ActivityState = require('../models/activityStateModel')
const mongoose = require('mongoose')

const getActivities = async (req, res) => {
  const activities = await Activity.find({}).sort({createdAt: -1})

  res.status(200).json(activities)
}

const getActivity = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such activity'})
  }

  const activity = await Activity.findById(id)
    .populate('managers')
    .populate('state')
    .populate('observations');

  if (!activity) {
    return res.status(404).json({error: 'No such activity'})
  }

  res.status(200).json(activity)
}

const createActivity = async (req, res) => {
  const {
    week, name, type, programmedDate, programmedHour, managers, publishDate, reminders, modality, link, pdf
  } = req.body;

  let emptyFields = [];

  // Validate required fields
  if (!week) { emptyFields.push('week'); }
  if (!name) { emptyFields.push('name'); }
  if (!type) { emptyFields.push('type'); }
  if (!programmedDate) { emptyFields.push('programmedDate'); }
  if (!programmedHour) { emptyFields.push('programmedHour'); }
  if (!managers || managers.length === 0) { emptyFields.push('managers'); }
  if (!publishDate) { emptyFields.push('publishDate'); }
  if (!modality) { emptyFields.push('modality'); }

  // Respond if there are empty required fields
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields });
  }

  // Add to the database
  try {
    const newState = await ActivityState.create({ type: 'Planeada' });
    if (!newState) {
      return res.status(404).json({error: 'Could not create State for Activity'});
    }

    const state = newState._id;
    const activity = await Activity.create({
      week, name, type, programmedDate, programmedHour, managers, publishDate, reminders, modality, link, state, pdf
    });
    return res.status(200).json(activity);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const deleteActivity = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such activity'})
  }

  const activity = await Activity.findOneAndDelete({_id: id})

  if(!activity) {
    return res.status(400).json({error: 'No such activity'})
  }

  res.status(200).json(activity)
}

const updateActivity = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such activity'})
  }

  const activity = await Activity.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!activity) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(activity)
}

const typeEnums = async (req,res) => {
  const typeEnums = Activity.schema.path('type').enumValues;
  const modalityEnums = Activity.schema.path('modality').enumValues;


  res.status(200).json({
    type: typeEnums,
    modality: modalityEnums
  })
}

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  deleteActivity,
  updateActivity,
  typeEnums
}