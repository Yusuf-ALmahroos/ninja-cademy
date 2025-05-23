const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController.js')

// added route for all courses
const Course = require('../models/course'); 

router.get('/all', async (req, res) => {             
  const allCourses = await Course.find()
  .populate('lessons')  // <-- added this to show lesson
  .populate('users'); 
  res.render('courses/all.ejs', { courses: allCourses });
})

router.get('/:title', courseController.getCourseByTitle)

router.post('/', courseController.addCourse)
router.get('/', courseController.getAllCourses)
router.put('/:id', courseController.updateCourseStatus)
router.delete('/:id', courseController.deleteCourse)

module.exports = router