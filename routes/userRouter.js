const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const Course = require('../models/course');
const User = require('../models/user.js');

// added route for dashboard

router.get('/dashboard', userController.renderDashboard);
router.get('/:id', userController.getUserById)
router.post('/enroll', userController.enrollCourse)

module.exports = router
