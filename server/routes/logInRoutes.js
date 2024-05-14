const express = require('express')
const {
    forgotPassword,
    loginUser,
    updatePassword
} = require('../controllers/logInController')

const router = express.Router()

// GET all Plans

router.post('/forgot', forgotPassword)

router.post('/namepass/get/', loginUser)

router.post('/updatePassword/:name', updatePassword)

module.exports = router