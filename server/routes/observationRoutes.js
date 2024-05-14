const express = require('express')
const {
  getObservations,
  getObservation,
  createObservation,
  deleteObservation,
  updateObservation
} = require('../controllers/observationController')

const router = express.Router()

// GET all Plans
router.get('/', getObservations)

// GET a single Plan
router.get('/:id', getObservation)

// POST a new Plan
router.post('/', createObservation)

// DELETE a Plan
router.delete('/:id', deleteObservation)

// UPDATE a Plan
router.patch('/:id', updateObservation)

module.exports = router