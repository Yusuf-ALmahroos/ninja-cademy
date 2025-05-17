const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lessonController.js')

router.post('/', lessonController.addLesson)

module.exports = router