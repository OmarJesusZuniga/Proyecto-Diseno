const express = require('express')
const {
    getGuideTeams,
    getGuideTeam,
    getGuideTeamsAssis,
    createGuideTeam,
    deleteGuideTeam,
    updateGuideTeam,
    addProfeGuideTeam,
    removeProfeGuide,
    getGuideTeamsByProfessorId,
    addGuideProfessor,
    removeGuideProfessor
} = require('../controllers/guideTeamController')

const router = express.Router()

router.post('/assistant/get', getGuideTeamsAssis)

router.post('/profe/get', getGuideTeamsByProfessorId);

// Get all por professor
router.post('/', getGuideTeams)



// Get one
router.get('/:id', getGuideTeam)

// Post a campus
router.post('/createTeam', createGuideTeam);

// Delete a campus
router.delete('/:id', deleteGuideTeam)

// Update a campus
router.patch('/:id', updateGuideTeam)

// agregar profe a equipo guia
router.post('/addProfe/', addProfeGuideTeam);


// remover profe de equipo guia
router.post('/removeProfe/',removeProfeGuide);

//add profe coordinador al equipo
router.patch('/addGuideProf/:guideTeamId/:professorId',addGuideProfessor);

//remove profe coordinador del equipo
router.patch('/revomeGuideProf/:guideTeamId', removeGuideProfessor);

module.exports = router