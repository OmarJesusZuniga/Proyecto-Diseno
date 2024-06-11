const express = require('express')
const {
    getDate,
    updateDate
} = require('../controllers/systemDateController.js')

const router = express.Router()

// Get all
router.get('/', getDate)

router.patch('/', updateDate)
 
module.exports = router