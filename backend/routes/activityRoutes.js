const express = require('express')
const {
  getActivities,
  getActivity,
  createActivity,
  deleteActivity,
  updateActivity,
  typeEnums
} = require('../controllers/activityController')

const router = express.Router()

// GET all Plans
router.get('/', getActivities)

// GET a single Plan
router.get('/:id', getActivity)

router.post('/enums', typeEnums)

// POST a new Plan
router.post('/', createActivity)

// DELETE a Plan
router.delete('/:id', deleteActivity)

// UPDATE a Plan
router.patch('/:id', updateActivity)

module.exports = router