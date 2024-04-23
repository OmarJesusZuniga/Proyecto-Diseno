const Student = require('../models/studentModel.js')

// Get all
const getStudents = async (req, res) => {
    const students = await Student.find({})
    
    res.status(200).json(students)
}



// Create new
const createStudent = async (req, res) => {
    const {studentCard, firstLastname, secondLastname, firstname, middlename, email, phoneNumber, campus} = req.body

    try {
        const student = await Student.create({studentCard, firstLastname, secondLastname, firstname, middlename, email, phoneNumber, campus})
        res.status(200).json(student)
    } catch (err) {
        res.status(400).json({error: err.message})
    }  
}

module.exports = {
    getStudents,
    createStudent
}