const express = require('express')
const {
    forgotPassword
} = require('../controllers/logInController')

const router = express.Router()

// GET all Plans
router.get('/', forgotPassword)


module.exports = router