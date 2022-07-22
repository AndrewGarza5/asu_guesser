const express = require('express')
const router = express.Router()

const {
    GetPhoto, 
    AddPhotoData, 
    Donations
} = require('../controllers/Photos.js')

router.route('/:photoName').get(GetPhoto)
router.route('/add-photo-data').post(AddPhotoData)
router.route('/donations/recent').get(Donations)

module.exports = router