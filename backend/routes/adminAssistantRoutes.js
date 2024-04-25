const express = require('express')
const {
    getAdminAssistants,
    getAdminAssistant,
    createAdminAssistant,
    deleteAdminAssistant,
    updateAdminAssistant
} = require('../controllers/adminAssistantController')

const router = express.Router()

// Get all
router.get('/', getAdminAssistants)

// Get one
router.get('/:id', getAdminAssistant)

// Post a professor
router.post('/', createAdminAssistant)


// Delete a professor
router.delete('/:id', deleteAdminAssistant)

// Update a professor
router.patch('/:id', updateAdminAssistant)
 
module.exports = router