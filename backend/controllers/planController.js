const Plan = require('../models/planModel')
const Profesor = require('../models/guideProfessorModel')
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
    return res.status(404).json({error: 'No such guide profesor'})
  }

  const profesor = await Profesor.findById(profesorId)

  if (!profesor) {
    return res.status(404).json({error: 'No such guide profesor'})
  }

  // add to the database
  try {
    const plan = await Plan.create({ profesorId })
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

module.exports = {
  getPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan
}