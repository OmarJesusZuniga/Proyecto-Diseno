const ActivityState = require('../models/activityStateModel')
const mongoose = require('mongoose')
const Notification = require('../models/notificationModel')
const getStudentsForActivity = require('./getStudentsPerGeneration');

// Element Activity Model 

class Visitor { // Interface
    visitAnouncement(activity) {
        throw new Error("Method 'visitAnouncement(activity)' must be implemented.");
    }

    visitReminder(activity) {
        throw new Error("Method 'visitReminder(activity)' must be implemented.");
    }
}

class ConcreteVisitor extends Visitor {
    async visitAnouncement(activity) {
        try {
            const students = await getStudentsForActivity(activity._id);
    
            if (students.length === 0) {
                console.log("No students found for this activity.");
                return; // Exit if no students are associated with the activity
            }

            // Map each student to the required format for the notification
            const studentEntries = students.map(student => ({
                studentId: student._id, 
                state: 0
            }));
    
            const newNotification = new Notification({
                text: 'Se ha notificado la actividad llamada: ' + activity.name,
                sender: mongoose.Types.ObjectId(activity.managers[0]), // example sender ID
                date: new Date(), // set current date
                programmedDate: activity.programmedDate,
                students: studentEntries // Include the mapped students with state = 0
            });
    
            // Save the new notification
            await newNotification.save();
            console.log("Generate announcement notification");
        } catch (error) {
            console.error('Error during notification creation:', error);
        }
    }

    async visitReminder(activity) {
        try {
            const students = await getStudentsForActivity(activity._id);
    
            if (students.length === 0) {
                console.log("No students found for this activity.");
                return; // Exit if no students are associated with the activity
            }

            // Map each student to the required format for the notification
            const studentEntries = students.map(student => ({
                studentId: student._id, 
                state: 0
            }));
    
            const newNotification = new Notification({
                text: 'Se les recuerda la programación de la actividad llamada: ' + activity.name,
                sender: mongoose.Types.ObjectId(activity.managers[0]), // example sender ID
                date: new Date(), // set current date
                programmedDate: activity.programmedDate,
                students: studentEntries // Include the mapped students with state = 0
            });
    
            // Save the new notification
            await newNotification.save();
            console.log("Generate reminder notification")
        } catch (error) {
            console.error('Error during notification creation:', error);
        }
    }

    async visitCancellation(activity) {
        try {
            const students = await getStudentsForActivity(activity._id);
    
            if (students.length === 0) {
                console.log("No students found for this activity.");
                return; // Exit if no students are associated with the activity
            }

            // Map each student to the required format for the notification
            const studentEntries = students.map(student => ({
                studentId: student._id, 
                state: 0
            }));
    
            const newNotification = new Notification({
                text: 'Se cancelo la actividad: ' + activity.name,
                sender: mongoose.Types.ObjectId(activity.managers[0]), // example sender ID
                date: new Date(), // set current date
                programmedDate: activity.programmedDate,
                students: studentEntries // Include the mapped students with state = 0
            });
    
            // Save the new notification
            await newNotification.save();
            console.log("Generate cancellation notification")
        } catch (error) {
            console.error('Error during notification creation:', error);
        }
    }
}

module.exports = {
    ConcreteVisitor
}