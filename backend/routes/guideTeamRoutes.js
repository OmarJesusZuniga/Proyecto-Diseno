const express = require('express')
const {
    getGuideTeams,
    getGuideTeam,
    getGuideTeamsAssis,
    createGuideTeam,
    deleteGuideTeam,
    updateGuideTeam,
    addProfeGuideTeam,
    removeProfeGuide
} = require('../controllers/guideTeamController')

const router = express.Router()

router.post('/assistant/get', getGuideTeamsAssis)

// Get all por professor
router.post('/', getGuideTeams)



// Get one
router.get('/:id', getGuideTeam)

// Post a campus
// router.post('/', createGuideTeam)

// Delete a campus
router.delete('/:id', deleteGuideTeam)

// Update a campus
router.patch('/:id', updateGuideTeam)

// agregar profe a equipo guia
router.post('/addProfe/', addProfeGuideTeam);


// remover profe de equipo guia
router.post('/removeProfe/',removeProfeGuide);

module.exports = router