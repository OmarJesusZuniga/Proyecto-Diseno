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

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    const query = {
        email: name,
        password: parseInt(password)
    };

    const queryAssistant = {
        firstname: name,
        password: parseInt(password)
    }


    let userType = null; // Variable to store the user type

    try {
        let queryResult = await Professor.find(query);

        if (queryResult.length > 0) {
            userType = 'Professor';
            // Send both the user type and the found professor data
            return res.status(200).json({
                Status: userType,
                Data: queryResult
            });
        } else {
            queryResult = await AdminAssistant.find(queryAssistant);
            if (queryResult.length > 0) {
                userType = 'Admin Assistant';
                // Send both the user type and the found admin assistant data
                return res.status(200).json({
                    Status: userType,
                    Data: queryResult
                });
            } else {
                console.log('')
                return res.status(404).json({
                    Status: "Not Found"
                });
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return res.status(500).json({
            Status: "Error",
            Message: "Internal Server Error"
        });
    }
};



module.exports = { forgotPassword, loginUser };
