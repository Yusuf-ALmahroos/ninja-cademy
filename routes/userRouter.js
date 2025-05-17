const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

router.get('/:id', userController.getUserById)
router.post('/enroll', userController.enrollCourse)

module.exports = router
