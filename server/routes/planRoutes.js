const express = require('express')
const {
  getPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan,
  addActivity,
  removeActivity
} = require('../controllers/planController')

const router = express.Router()

// GET all Plans
router.get('/', getPlans)

// GET a single Plan
router.get('/:id', getPlan)

// POST a new Plan
router.post('/', createPlan)

router.post('/addActivity', addActivity)

router.post('/removeActivity', removeActivity)

// DELETE a Plan
router.delete('/:id', deletePlan)

// UPDATE a Plan
router.patch('/:id', updatePlan)

module.exports = router