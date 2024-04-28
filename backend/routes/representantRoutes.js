const express = require('express')
const {
    getRepresentants,
    getRepresentant,
    createRepresentant,
    deleteRepresentant,
    updateRepresentant
} = require('../controllers/representantController')

const router = express.Router()

// Get all
router.get('/', getRepresentants)

// Get one
router.get('/:id', getRepresentant)

// Post a representant
router.post('/', createRepresentant)


// Delete a representant
router.delete('/:id', deleteRepresentant)

// Update a representant
router.patch('/:id', updateRepresentant)
 
module.exports = router