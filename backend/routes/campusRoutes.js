const express = require('express')
const {
    getCampuses,
    getCampus,
    createCampus,
    deleteCampus,
    updateCampus
} = require('../controllers/campusController')

const router = express.Router()

// Get all
router.get('/', getCampuses)

// Get one
router.get('/:id', getCampus)

// Post a campus
router.post('/', createCampus)


// Delete a campus
router.delete('/:id', deleteCampus)

// Update a campus
router.patch('/:id', updateCampus)

module.exports = router