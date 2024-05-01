const express = require('express')
const {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment
} = require('../controllers/commentController')

const router = express.Router()

// Localhost:3000/api// - post

// GET all Plans
router.get('/', getComments)

// GET a single Plan
router.get('/:id', getComment)

// POST a new Plan
router.post('/', createComment)

// DELETE a Plan
router.delete('/:id', deleteComment)

// UPDATE a Plan
router.patch('/:id', updateComment)

module.exports = router