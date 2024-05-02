const express = require('express')
const {
    getGuideTeams,
    getGuideTeam,
    createGuideTeam,
    deleteGuideTeam,
    updateGuideTeam
} = require('../controllers/guideTeamController')

const router = express.Router()

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

module.exports = router