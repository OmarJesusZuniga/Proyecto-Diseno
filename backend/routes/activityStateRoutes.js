const express = require('express')
const {
  getActivityStates,
  getActivityState,
  createActivityState,
  deleteActivityState,
  updateActivityState
} = require('../controllers/activityStateController')

const router = express.Router()

// GET all Plans
router.get('/', getActivityStates)

// GET a single Plan
router.get('/:id', getActivityState)

router.post('/', createActivityState)

// DELETE a Plan
router.delete('/:id', deleteActivityState)

// UPDATE a Plan
router.patch('/:id', updateActivityState)

module.exports = router