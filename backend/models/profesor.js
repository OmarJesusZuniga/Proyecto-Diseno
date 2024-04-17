import mongoose from "mongoose";

const profesorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }
});

export const profesor = mongoose.model("profesor", profesorSchema);