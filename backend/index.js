import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { profesor } from "./models/profesor.js";

const app = express();

app.get('/' , (req, res) => {
    res.send('Hello World');
});

// Save a new person
app.post('/person', (req, res) => {
    try {
        if (
            !request.body.title 
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            })
        }
        const newPerson = new Person({
            name: request.body.title,
        });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});  
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () =>{
            console.log('App is running on port 5555');
        });
    })
    .catch((error) => {
        console.log(error);
    });