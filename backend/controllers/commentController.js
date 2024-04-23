const Comment = require('../models/commentModel')
const Profesor = require('../models/guideProfessorModel')
const mongoose = require('mongoose')

const errorMessage = 'No such comment';

// get all workouts
const getComments = async (req, res) => {
  const comment = await Comment.find({}).sort({createdAt: -1})

  res.status(200).json(comment)
}

// get a single workout
const getComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: errorMessage})
  }

  const comment = await Comment.findById(id).populate('comments')

  if (!comment) {
    return res.status(404).json({error: errorMessage})
  }

  res.status(200).json(comment)
}

// create a new workout
const createComment = async (req, res) => {
  const {text, profesorId} = req.body

  if (!mongoose.Types.ObjectId.isValid(profesorId)) {
    return res.status(404).json({error: 'No such guide profesor'})
  }

  const profesor = await Profesor.findById(profesorId)

  if (!profesor) {
    return res.status(404).json({error: 'No such guide profesor'})
  }

  if (!text) {
    return res.status(400).json({ error: 'Please fill the text field' })
  }

  // add to the database
  try {
    const comment = await Comment.create({ text, profesor : profesorId})
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: errorMessage})
  }

  const comment = await Comment.findOneAndDelete({_id: id})

  if(!comment) {
    return res.status(400).json({error: errorMessage})
  }

  res.status(200).json(comment)
}

// update a workout
const updateComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: errorMessage})
  }

  const comment = await Comment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!comment) {
    return res.status(400).json({error: errorMessage})
  }

  res.status(200).json(comment)
}

module.exports = {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment
}