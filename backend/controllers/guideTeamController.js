const GuideTeam = require('../models/guideTeamModel')
const State = require('../controllers/activityStateController')
const mongoose = require('mongoose')
const { GridFSBucketWriteStream } = require('mongodb')

const getGuideTeams = async (req, res) => {
  const guideTeams = await GuideTeam.find({}).sort({})

  res.status(200).json(guideTeams)
}

const getGuideTeam = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such guide team'})
  }

  const guideTeam = await GuideTeam.findById(id)
    .populate('students')
    .populate('representants')
    .populate('adminAssistants')
    .populate('professors');

  if (!guideTeam) {
    return res.status(404).json({error: 'No such guide team'})
  }

  res.status(200).json(guideTeam)
}

const createGuideTeam = async (req, res) => {
  const {
    generation, students, representants, adminAssistants, plan, professors
  } = req.body;

  let emptyFields = [];

  // Validate required fields
  if (!generation) {
    emptyFields.push('generation');
  }
  if (!students || students.length === 0) {
    emptyFields.push('students');
  }
  if (!representants || representants.length === 0) {
    emptyFields.push('representants');
  }
  if (!adminAssistants || adminAssistants.length === 0) { // Ensure there is at least one manager
    emptyFields.push('managers');
  }
  if (!plan) {
    emptyFields.push('plan');
  }
  if (!professors || professors.length === 0) {
    emptyFields.push('professors');
  }

  // Respond if there are empty required fields
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields });
  }

  // Add to the database
  try {
    const guideTeam = await GuideTeam.create({
        generation, students, representants, adminAssistants, plan, professors
    });
    res.status(200).json(guideTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGuideTeam = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such guide team'})
  }

  const guideTeam = await GuideTeam.findOneAndDelete({_id: id})

  if(!guideTeam) {
    return res.status(400).json({error: 'No such guideTeam'})
  }

  res.status(200).json(guideTeam)
}

const updateGuideTeam = async (req, res) => {
  const { id } = req.params
  const { plan } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such guide team'})
  }

  if (plan && !mongoose.Types.ObjectId.isValid(plan)) {
    return res.status(400).json({error: 'No such plan'})
  }

  const guideTeam = await GuideTeam.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!guideTeam) {
    return res.status(400).json({error: 'No such guide team'})
  }

  res.status(200).json(guideTeam)
}

module.exports = {
  getGuideTeams,
  getGuideTeam,
  createGuideTeam,
  deleteGuideTeam,
  updateGuideTeam
}