const express = require('express')
const {
    notify
} = require('../controllers/observer.js')

const router = express.Router()

// Get all
router.post('/', notify)

 
module.exports = router