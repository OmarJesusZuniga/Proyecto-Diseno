const express = require('express')
const {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent,
    getNotifications,
    postNotification,
    updateNotification,
    deleteNotification
} = require('../controllers/studentController')

const router = express.Router()

// Get all
router.get('/', getStudents)

// Get one
router.get('/:id', getStudent)

// Get all notifications from one
router.get('/mail/:id', getNotifications)

//temporal
router.post('/notification/', postNotification)

//update notification state
router.patch('/notification/', updateNotification)

//delete student state
router.patch('/notification/delete', deleteNotification)

// Post a student
router.post('/', createStudent)

// Delete a student
router.delete('/:id', deleteStudent)

// Update a student
router.patch('/:id', updateStudent)
 
module.exports = router