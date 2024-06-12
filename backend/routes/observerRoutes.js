const express = require('express')
const {
    notify
} = require('../controllers/observer.js')

const router = express.Router()

// Get all
router.get('/', notify)

 
module.exports = router