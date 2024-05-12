const adminAssistant = require('../models/adminAssistantModel')
const GuideTeam = require('../models/guideTeamModel')
const Professor = require('../models/professorModel')
const mongoose = require('mongoose')

const getGuideTeams = async (req, res) => {
  const { id } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such professor'})
  }

  const professor = await Professor.findById(id)

  if (!professor) {
    return res.status(404).json({error: 'No such professor team'})
  }

  const guideTeams = await GuideTeam.find({ professors: id }).populate('professors');

  if (guideTeams.length === 0) {
    return res.status(404).json({ error: 'No guide teams found for this professor' });
  }

  res.status(200).json(guideTeams)
}

//get teams by assitant
const getGuideTeamsAssis = async (req, res) => {
  
  const {id} = req.body
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such assistant'})
  }

  const assistant = await adminAssistant.findById(id)
  

  if(!assistant){
    return res.status(404).json({error: 'No such assistant'})
  }

  const teams = await GuideTeam.find({ adminAssistants: id })
    .populate('professors')
    .populate('students')
    .populate('guideProfessor');

  
  

  if (teams.length === 0) {
    return res.status(404).json({ error: 'No guide teams found for this assitant' });
  }
  
  res.status(200).json(teams)

}

//get teams by professor id
const getGuideTeamsByProfessorId = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid professor ID' });
  }

  try {
    const professor = await Professor.findById(id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor not found' });
    }

    const guideTeams = await GuideTeam.find({ professors: id }).populate('professors')
      .populate('professors')
      .populate('students')
      .populate('guideProfessor');
    if (guideTeams.length === 0) {
      return res.status(404).json({ error: 'No guide teams found for this professor' });
    }

    res.status(200).json(guideTeams);
  } catch (error) {
    console.error('Error fetching guide teams by professor ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getGuideTeam = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such guide team'})
  }

  const guideTeam = await GuideTeam.findById(id)
  .populate('professors')
  .populate('students')
  .populate('guideProfessor');

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


const addProfeGuideTeam = async (req, res) => {
  const { guideTeamId, professorId } = req.body;

  try {
      const guideTeam = await GuideTeam.findById(guideTeamId);
      if (!guideTeam) {
          return res.status(404).json({ error: 'Guide team not found' });
      }

      if (!guideTeam.professors.includes(professorId)) {
          guideTeam.professors.push(professorId);
          await guideTeam.save();
      }

      res.status(200).json(guideTeam);
  } catch (error) {
      console.error('Error adding professor to guide team:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}


const removeProfeGuide = async (req, res) => {
  const { guideTeamId, professorId } = req.body;

  try {
      const guideTeam = await GuideTeam.findByIdAndUpdate(
          guideTeamId,
          { $pull: { professors: professorId } },
          { new: true }
      );

      if (!guideTeam) {
          return res.status(404).json({ error: 'Guide team not found' });
      }
      
      res.status(200).json(guideTeam);
  } catch (error) {
      console.error('Error removing professor from guide team:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  getGuideTeams,
  getGuideTeamsAssis,
  getGuideTeam,
  createGuideTeam,
  deleteGuideTeam,
  updateGuideTeam,
  addProfeGuideTeam,
  removeProfeGuide,
  getGuideTeamsByProfessorId
}