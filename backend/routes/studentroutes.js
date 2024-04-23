const express = require('express')
const {
    getStudents,
    createStudent
} = require('../controllers/studentController')

const router = express.Router()

// Get all
router.get('/', (req, res)  => {
    res.json({mssg: "GET all students"})
})

// Get one
router.get('/:id', (req, res)  => {
    res.json({mssg: "GET a single student"})
})

// Post a student
router.post('/', createStudent)


// Delete a student
router.delete('/:id', (req, res)  => {
    res.json({mssg: "DELETE a student"})
})

// Update a student
router.patch('/:id', (req, res)  => {
    res.json({mssg: "PATCH a student"})
})
 
module.exports = router