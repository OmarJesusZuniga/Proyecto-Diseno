const mongoose = require('mongoose')
const Professor = require('../models/professorModel.js')
const AdminAssistant = require('../models/adminAssistantModel.js')

// Get all
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const query = { email };

    let userType = null; // Variable to store the user type

    try {
        let queryResult = await Professor.find(query);

        if (queryResult.length > 0) {
            userType = 'Professor';
        } else {
            queryResult = await AdminAssistant.find(query);
            if (queryResult.length > 0) {
                userType = 'Admin Assistant';
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }

    if (userType) {
        return res.send({Status: "Success"});
    } else {
        return res.send({Status: "Not"});
    }

    // Continue with other logic or processing
};

module.exports = { forgotPassword };
