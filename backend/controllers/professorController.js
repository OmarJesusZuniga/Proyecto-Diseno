const Professor = require('../models/professorModel.js')
const mongoose = require('mongoose')

// Get all
const getProfessors = async (req, res) => {
    const professor = await Professor.find({}).sort({})

    
    res.status(200).json(professor)
}

// Get a single professor
const getProfessor = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such professor"})
    }
    
    const professor = await Professor.findById(id).populate('campus')

    if (!professor) {
        return res.status(404).json({error: "No such professor"})
    }

    res.status(200).json(professor)
}

//Get usando correo y password
const getProfessorUserPass = async (req, res) => {
    const {user, password} = req.body;

    const query = {
        email: user,
        password: password
    }


    try {

        const queryResult = await Professor.find(query);

        if (queryResult){
            res.status(200).json(queryResult)
        }

    } catch{
        res.status(404).json("error fetching data");
    }

}



// Create new
const createProfessor = async (req, res) => {
    const {code, firstLastname, secondLastname, firstname, middlename, email, officeNumber, phoneNumber, campus, image, password} = req.body
    console.log(req.body)
    

    if (image === ''){
        try {
            const professor = await Professor.create({code, firstLastname, secondLastname, firstname, middlename, email, officeNumber, phoneNumber, campus, password})
            res.status(200).json(professor)
        } catch (err) {
            console.log(err)
            res.status(400).json({error: "Please fill in all the required fields."})
        }
    } else {
        if (image && !mongoose.Types.ObjectId.isValid(image)) {
            return res.status(400).json({error: "Invalid image id."})
        }
        try {
            const professor = await Professor.create({code, firstLastname, secondLastname, firstname, middlename, email, officeNumber, phoneNumber, campus, password, image})
            res.status(200).json(professor)
        } catch (err) {
            console.log(err)
            res.status(400).json({error: "Please fill in all the required fields."})
        }
    }

      
}

// Delete a professor
const deleteProfessor = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such professor"})
    }
    
    const professor = await Professor.findOneAndDelete({_id: id})

    if (!professor) {
        return res.status(404).json({error: "No such professor"})
    }

    res.status(200).json(professor)
}

// Update a professor
const updateProfessor = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such professor"})
    }

    const professor = await Professor.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!professor) {
        return res.status(404).json({error: "No such professor"})
    }

    res.status(200).json(professor)
}

const getLastProfessorByCampus = async (req, res) => {
    const { campusId } = req.params;
  
    try {
      // Find professors with the specified campus ID, sorted by creation timestamp in descending order
      const lastProfessor = await Professor.findOne({ campus: campusId })
        .sort({ createdAt: -1 })
        .exec();
  
      if (!lastProfessor) {
        return res.status(404).json({ error: 'No professor found for the specified campus' });
      }
  
      res.status(200).json(lastProfessor);
    } catch (error) {
      console.error('Error fetching last professor by campus:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
    getProfessors,
    getProfessor,
    getProfessorUserPass,
    createProfessor,
    deleteProfessor,
    updateProfessor,
    getLastProfessorByCampus
}