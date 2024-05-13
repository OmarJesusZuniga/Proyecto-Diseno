const Student = require('../models/studentModel.js')
const Campus = require('../models/campusModel.js')
const mongoose = require('mongoose')

// Get all ordered
const getStudents = async (req, res) => {
    const sortField = req.query.sort; 

    const validSortFields = {
        firstname: 'asc',   
        studentCard: 'asc', 
        campusCode: 'asc'   
    };

    const sortCriteria = validSortFields[sortField] ? {[sortField]: validSortFields[sortField]} : {firstname: 'asc'};

    try {
        const students = await Student.find({}).sort(sortCriteria);

        const studentsCampusCode = await Promise.all(students.map(async (student) => {
            const campus = await Campus.findById(student.campus);
            const campusCode = campus ? campus.code : "Unknown"; 
            return {
                ...student._doc,  
                campusCode        
            };
        }));

        if (sortField === 'campusCode') {
            studentsCampusCode.sort((a, b) => a.campusCode.localeCompare(b.campusCode));
        }

        res.status(200).json(studentsCampusCode);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
        res.status(400).json({error: "Please fill in all the required fields."})
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