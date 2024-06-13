const express = require('express')
const {
    Observer
} = require('../controllers/observer.js')

const observer = new Observer();

const router = express.Router()

const notify = async (req, res) => {
    try {
        await observer.notify()
        res.status(200)
    } catch (error) {
        res.status(400)
    }
}

// Get all
router.get('/', notify)

 
module.exports = router