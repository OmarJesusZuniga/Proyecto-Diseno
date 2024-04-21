import express from "express";
import { profesor } from "../models/profesor.js";

const router = express.Router();

// Save a new person
router.post('/', async (req, res) => {
    try {
        const newPerson = new Person({
            name: "Libro de Prueba",
        });

        const profesorNuevo = await profesor.create(newPerson);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});  
    }
});

export default router; 