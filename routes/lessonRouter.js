const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lessonController.js')
const Lesson = require('../models/lesson');


router.get('/all', async (req, res) => {             
  const allCourses = await Course.find().populate('lessons');
  res.render('courses/all', { courses: allCourses });
});

router.post('/', lessonController.addLesson)

module.exports = router