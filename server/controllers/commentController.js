const Comment = require('../models/commentModel')
const Observation = require('../models/observationModel')
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
  const {text, professor, idObservation} = req.body
  console.log("Entro")
  console.log(idObservation)
  const id = professor._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such guide profesor'})
  }

  try {
    console.log("Entro2")
    const observation = await Observation.findById(idObservation); // Ensure you use the correct field name
    if (!observation) {
      return res.status(404).json({ error: 'Observation not found' });
    }
    console.log("observation")
    console.log(observation)
  
    const comment = await Comment.create({ text: text, professor: id, comments: [] })
    console.log("comment")
    console.log(comment)
    observation.comments.push(comment._id);
    await observation.save();

    res.status(200).json(comment)

  } catch(error) {
    console.log({ error: error.message })
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