const express = require('express')
const {
  getPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan
} = require('../controllers/planController')

const router = express.Router()

// GET all Plans
router.get('/', getPlans)

// GET a single Plan
router.get('/:id', getPlan)

// POST a new Plan
router.post('/', createPlan)

// DELETE a Plan
router.delete('/:id', deletePlan)

// UPDATE a Plan
router.patch('/:id', updatePlan)

module.exports = router