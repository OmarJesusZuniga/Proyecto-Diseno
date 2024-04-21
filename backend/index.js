import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import profesorRoute from "./routes/profesorRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get('/' , (req, res) => {
    res.send('Hello World');
});

app.use('/books', profesorRoute);

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