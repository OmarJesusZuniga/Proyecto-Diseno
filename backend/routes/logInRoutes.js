const express = require('express')
const {
    forgotPassword
} = require('../controllers/logInController')

const router = express.Router()

// GET all Plans
router.get('/', forgotPassword)

router.get('/:id', forgotPassword)


module.exports = router