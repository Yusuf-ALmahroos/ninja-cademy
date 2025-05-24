const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lessonController.js')
const Lesson = require('../models/lesson');


/* router.get('/all', async (req, res) => {             
  const allLessons = await Lesson.find().populate('lessons');
  res.render('lessons/all', { courses: allLessons });
}); */

router.get('/:lessonId', lessonController.showLesson);

router.post('/', lessonController.addLesson)
router.post('/admin', lessonController.addLessonAdmin);
router.post('/admin-delete', lessonController.deleteLessonAdmin);

module.exports = router