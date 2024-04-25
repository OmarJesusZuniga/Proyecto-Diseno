const express = require('express')
const {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
} = require('../controllers/studentController')

const router = express.Router()

// Get all
router.get('/', getStudents)

// Get one
router.get('/:id', getStudent)

// Post a student
router.post('/', createStudent)


// Delete a student
router.delete('/:id', deleteStudent)

// Update a student
router.patch('/:id', updateStudent)
 
module.exports = router