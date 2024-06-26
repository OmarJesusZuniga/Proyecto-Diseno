const mongoose = require('mongoose')
const Professor = require('../models/professorModel.js')
const AdminAssistant = require('../models/adminAssistantModel.js')
var nodemailer = require('nodemailer');

const forgotPassword = async (req, res) => {
    const { name } = req.body;

    const query = {
        email: name
    };

    try {
        let queryResult = await Professor.find(query);
        if (queryResult.length > 0) {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                secure: true,
                logger: true,
                debug: true,
                secureConnection: false,
                auth: {
                    user: 'poogr40@gmail.com',
                    pass: 'septtczjgleebadu'
                },
                tls: {
                    rejectUnauthorized: true
                }
            });

            var mailOptions = {
                from: 'poogr40@gmail.com',
                to: name,
                subject: 'Password recovery',
                text: `Please, enter to the next link to reset your password: \n http://localhost:3000/ResetPassword/${name}`
            };
            
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ error: "Email not sent", detail: "EMAIL_NOT_SEND" });
                } else {
                    return res.status(200).json({ Status: "Success", name: name});
                }
            });

        } else {
            console.log("Professor not found, checking Admin Assistant...");
            queryResult = await AdminAssistant.find(query);
            console.log("Admin Assistant query result:", queryResult);
            if (queryResult.length > 0) {
                console.log("Admin Assistant found, sending email...");
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    port: 465,
                    secure: true,
                    logger: true,
                    debug: true,
                    secureConnection: false,
                    auth: {
                        user: 'poogr40@gmail.com',
                        pass: 'septtczjgleebadu'
                    },
                    tls: {
                        rejectUnauthorized: true
                    }
                });

                var mailOptions = {
                    from: 'poogr40@gmail.com',
                    to: name,
                    subject: 'Password recovery',
                    text: `Please, enter to the next link to reset your password: \n http://localhost:3000/ResetPassword/${name}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error("Error sending email:", error);
                        return res.status(500).json({ error: "Email not sent", detail: "EMAIL_NOT_SEND" });
                    } else {
                        return res.status(200).json({ Status: "Success", name: name});
                    }
                });

            } else {
                console.log("Admin Assistant not found.");
                return res.send({ Status: "Not" }, name);
            }
        }

    } catch (error) {
        console.error("Error fetching data:", error.message);
        return res.send({ Status: "Not" }, name);
    }
};

const updatePassword = async (req, res) => {
    const { name } = req.params;
    const { password } = req.body;

    try {
        let professor = await Professor.findOne({ email: name });
        console.log(professor)
        if (professor) {
            professor.password = password;
            await professor.save(); 

            return res.send({ Status: "Success" });
        } else {
            let adminAssistant = await AdminAssistant.findOne({ firstname: name });
            console.log(adminAssistant)
            if (adminAssistant) {
                adminAssistant.password = password; 
                await adminAssistant.save(); 

                return res.send({ Status: "Success" });
            } else {
                return res.send({ Status: "Not" });
            }
        }
    } catch (error) {
        console.error("Error updating password:", error.message);
        return res.send({ Status: "Error" });
    }
};


const loginUser = async (req, res) => {
    const { name, password } = req.body;
    const query = {
        email: name,
        password: parseInt(password)
    };

    const queryAssistant = {
        email: name,
        password: parseInt(password)
    }


    let userType = null;

    try {
        let queryResult = await Professor.find(query);

        if (queryResult.length > 0) {
            userType = 'Professor';
            return res.status(200).json({
                Status: userType,
                Data: queryResult
            });
        } else {
            queryResult = await AdminAssistant.find(queryAssistant);
            if (queryResult.length > 0) {
                userType = 'Admin Assistant';
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



module.exports = { forgotPassword, loginUser, updatePassword };
