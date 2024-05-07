const Plan = require('../models/planModel')
const Profesor = require('../models/professorModel')
const mongoose = require('mongoose')

const getPlans = async (req, res) => {
  const plans = await Plan.find({}).sort({createdAt: -1})

  res.status(200).json(plans)
}

const getPlan = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such plan'})
  }

  const plan = await Plan.findById(id).populate('activities');

  if (!plan) {
    return res.status(404).json({error: 'No such plan'})
  }

  res.status(200).json(plan)
}

const createPlan = async (req, res) => {
  const { profesorId } = req.body

  if (!mongoose.Types.ObjectId.isValid(profesorId)) {
    return res.status(404).json({error: 'No such profesor 1'})
  }

  const profesor = await Profesor.findById(profesorId)

  if (!profesor) {
    return res.status(404).json({error: 'No such profesor'})
  }

  // add to the database
  try {
    const plan = await Plan.create({ professor: profesorId })
    res.status(200).json(plan)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deletePlan = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such plan'})
  }

  const plan = await Plan.findOneAndDelete({_id: id})

  if(!plan) {
    return res.status(400).json({error: 'No such plan'})
  }

  res.status(200).json(plan)
}

const updatePlan = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const plan = await Plan.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!plan) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(plan)
}

const addActivity = async (req, res) => {
  const { id, newActivity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const plan = await Plan.findOneAndUpdate(
      { _id: id },
      { $push: { activities: newActivity } },
      { new: true } 
    );

    if (!plan) {
      return res.status(404).json({ error: 'No such plan found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const removeActivity = async (req, res) => {
  const { id, activityId } = req.body;  // Assuming activities are uniquely identified by `activityId`

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const plan = await Plan.findOneAndUpdate(
      { _id: id },
      { $pull: { activities: activityId } },  // Adjust this to match your schema
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ error: 'No such plan found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan,
  addActivity,
  removeActivity
}