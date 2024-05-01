const express = require('express')
const upload = require('../controllers/imageUploadController'); // adjust the path as necessary
const {
    getImage,
    createImage,
    deleteImage,
    updateImage
} = require('../controllers/imageController')

const router = express.Router()

// GET a single Plan
router.get('/:id', getImage)

// POST a new Plan
router.post('/', upload.single('file'), createImage);

// DELETE a Plan
router.delete('/:id', deleteImage)

// UPDATE a Plan
router.patch('/:id', updateImage)

module.exports = router