const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController.js')

// added route for all courses
const Course = require('../models/course'); 

router.get('/all', courseController.getAllCourses);

router.get('/:title', courseController.getCourseByTitle)

router.post('/', courseController.addCourse)
router.put('/:id', courseController.updateCourseStatus)
router.delete('/:id', courseController.deleteCourse)

module.exports = router