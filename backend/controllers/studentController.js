const Student = require('../models/studentModel.js')
const Notification = require('../models/notificationModel.js')
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
    const password = studentCard;

    try {
        const student = await Student.create({studentCard, firstLastname, secondLastname, firstname, middlename, email, phoneNumber, campus, password})
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
/*const updateStudent = async (req, res) => {
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
}*/

const updateStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such student" });
    }
    
    const updatedStudent = await Student.findOneAndUpdate({_id: id}, {...req.body}, { new: true });

    if (!updatedStudent) {
        return res.status(404).json({ error: "No such student" });
    }

    res.status(200).json(updatedStudent);
}

//Get all notifications
const getNotifications = async (req, res) => {
    const { id } = req.params;

    try {
        const notifications = await Notification.find({
            'students.studentId': mongoose.Types.ObjectId(id) 
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const postNotification = async (req, res) => {
    const newNotification = new Notification({
        text: 'Se ha notificado la actividad llamada: Motivacion a los Estudiantes',
        sender: mongoose.Types.ObjectId('6633f06e7d9e11f1cb72ae81'), // example sender ID
        date: new Date('2024-06-13T14:20:00.000Z'), // set current date
        students: [
            { studentId: mongoose.Types.ObjectId('66273638ae013c65dbc53dae'), state: 0 },
            { studentId: mongoose.Types.ObjectId('6632c153adc93f401eebcee2'), state: 0 }
        ]
    });
    newNotification.save();
}

const updateNotification = async (req, res) => {
    const { notificationId, studentId } = req.body;

    try {
        // First, find the notification that contains the student
        const notification = await Notification.findOne({
            _id: mongoose.Types.ObjectId(notificationId),
            'students.studentId': mongoose.Types.ObjectId(studentId)
        });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Find the student in the students array and toggle the state
        const student = notification.students.find(s => s.studentId.equals(mongoose.Types.ObjectId(studentId)));
        if (student) {
            student.state = student.state === 0 ? 1 : 0;
            await notification.save();
            res.status(200).json({ message: 'Notification state updated successfully' });
        } else {
            res.status(404).json({ message: 'Student not found in notification' });
        }
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteNotification = async (req, res) => {
    const { notificationId, studentId } = req.body;

    try {
        // Perform the update to remove the student from the notification
        const result = await Notification.updateOne(
            { _id: mongoose.Types.ObjectId(notificationId) }, // Ensure the notification ID is converted to ObjectId
            { $pull: { students: { studentId: mongoose.Types.ObjectId(studentId) } } } // Pull operation to remove the student
        );

        if (result.modifiedCount === 0) {
            // No document was modified, either the notification or the student was not found
            res.status(404).json({ message: 'Notification or student not found, no changes made' });
        } else {
            // Successfully removed the student
            res.status(200).json({ message: 'Student removed from notification successfully' });
        }
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent,
    getNotifications,
    postNotification,
    updateNotification,
    deleteNotification
}