const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController.js')

// added route for all courses
const Course = require('../models/course'); 

router.get('/all', async (req, res) => {             
  const allCourses = await Course.find(); 
  res.render('courses/all', { courses: allCourses });
})

router.post('/', courseController.addCourse)
router.get('/', courseController.getAllCourses)
router.get('/:id', courseController.getCourseById)
router.put('/:id', courseController.updateCourseStatus)
router.delete('/:id', courseController.deleteCourse)

module.exports = router