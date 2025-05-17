const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController.js')

router.post('/', courseController.addCourse)

module.exports = router