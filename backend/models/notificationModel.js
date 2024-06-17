const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a sub-schema for the tuples
const studentStateSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    state: {
        type: Number,
        required: true
    }
}, { _id: false }); // _id set to false because we do not need a separate _id for subdocuments

// Main notification schema
const notificationSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    programmedDate: {
        type: Date,
        required: true
    },
    students: [studentStateSchema] // Array of tuples as subdocuments
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
