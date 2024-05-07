const express = require('express')
const upload = require('../controllers/imageUploadController'); // adjust the path as necessary
const {
    getImage,
    createImage,
    deleteImage,
    getImagePath
} = require('../controllers/imageController')

const router = express.Router()

// GET a single image
router.get('/:id', getImage)

// POST a new image
router.post('/', upload.single('file'), createImage);

router.post('/getPath', getImagePath);

// DELETE a image
router.delete('/:id', deleteImage)


module.exports = router