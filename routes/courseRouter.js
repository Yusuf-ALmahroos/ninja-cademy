const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController.js')

router.post('/', courseController.addCourse)
router.get('/', courseController.getAllCourses)
router.get('/', courseController.getCourseById)
router.put('/', courseController.updateCourseStatus)
router.delete('/:id', courseController.deleteCourse)

module.exports = router