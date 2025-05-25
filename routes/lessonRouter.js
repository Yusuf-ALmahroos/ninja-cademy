const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lessonController.js')
const Lesson = require('../models/lesson');

router.post('/:lessonId', lessonController.showLesson);

router.post('/', lessonController.addLesson)
router.post('/admin/add', lessonController.addLessonAdmin);
router.post('/admin/delete', lessonController.deleteLessonAdmin);

router.delete('/:id', lessonController.deleteLesson)

module.exports = router