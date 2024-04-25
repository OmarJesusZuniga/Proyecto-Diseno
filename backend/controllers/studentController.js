const Student = require('../models/studentModel.js')
const mongoose = require('mongoose')

// Get all
const getStudents = async (req, res) => {
    const students = await Student.find({}).sort({})

    
    res.status(200).json(students)
}

// Get a single student
const getStudent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such student"})
    }
    
    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({error: "No such student"})
    }

    res.status(200).json(student)
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

// Delete a student
const deleteStudent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such student"})
    }
    
    const student = await Student.findOneAndDelete({_id: id})

    if (!student) {
        return res.status(404).json({error: "No such student"})
    }

    res.status(200).json(student)
}

// Update a student
const updateStudent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such student"})
    }
    
    const student = await Student.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!student) {
        return res.status(404).json({error: "No such student"})
    }

    res.status(200).json(student)
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}