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

// Post a admin assistant
router.post('/', createAdminAssistant)


// Delete a admin assistant
router.delete('/:id', deleteAdminAssistant)

// Update a admin assistant
router.patch('/:id', updateAdminAssistant)
 
module.exports = router