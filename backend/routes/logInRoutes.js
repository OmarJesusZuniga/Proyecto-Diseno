const express = require('express')
const {
    forgotPassword,
    loginUser
} = require('../controllers/logInController')

const router = express.Router()

// GET all Plans

router.post('/:id', forgotPassword)

router.post('/namepass/get/', loginUser)


module.exports = router