const express = require('express')
const {
    getProfessors,
    getProfessor,
    getProfessorUserPass,
    createProfessor,
    deleteProfessor,
    updateProfessor
} = require('../controllers/professorController')

const router = express.Router()

// Get all
router.get('/', getProfessors)

// Get one
router.get('/:id', getProfessor)

//Get by name and password
router.post('/namepass/get/',getProfessorUserPass)

// Post a professor
router.post('/', createProfessor)


// Delete a professor
router.delete('/:id', deleteProfessor)

// Update a professor
router.patch('/:id', updateProfessor)
 
module.exports = router