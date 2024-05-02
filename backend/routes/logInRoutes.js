const express = require('express')
const {
    forgotPassword,
    loginUser
} = require('../controllers/logInController')

const router = express.Router()

// GET all Plans
router.get('/', forgotPassword)

router.get('/:id', forgotPassword)

router.post('/namepass/get/', loginUser)


module.exports = router