const mongoose = require('mongoose')
const Professor = require('../models/professorModel.js')
const AdminAssistant = require('../models/adminAssistantModel.js')

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const query = { email };

    let userType = null;

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
        console.log("hola")
        return res.send({Status: "Success"});
    } else {
        return res.send({Status: "Not"});
    }
};

const forgotPasswordX = async (req, res) => {
    const { email } = req.body;
    const query = { email };

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
                to: email,
                subject: 'Password recovery - Datahub',
                text: "Please, enter to the next link to reset you password: " `\n http://localhost:5173/ResetPassword`
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    res.status(500).json({error: 'Email not sent', detail: 'EMAIL_NOT_SEND'});
                } else {
                    res.json({message: 'User exist', id: id})
                }
            });
            return res.send({Status: "Success"});

        } else {
            queryResult = await AdminAssistant.find(query);
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
                    to: email,
                    subject: 'Password recovery - Datahub',
                    text: "Please, enter to the next link to reset you password: " `\n http://localhost:5173/ResetPassword`
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        res.status(500).json({error: 'Email not sent', detail: 'EMAIL_NOT_SEND'});
                    } else {
                        res.json({message: 'User exist', id: id})
                    }
                });
                return res.send({Status: "Success"});
                
            } else {
                console.log('')
                return res.send({Status: "Not"});
            }
        }
        
        } catch (error) {
            console.error("Error fetching data:", error.message);
            return res.send({Status: "Not"});
    }

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



module.exports = { forgotPassword, loginUser };
