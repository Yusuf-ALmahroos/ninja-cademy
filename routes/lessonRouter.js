const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController.js');

router.post('/:lessonId', lessonController.showLesson);
router.post('/', lessonController.addLesson);
router.post('/admin/add', lessonController.addLessonAdmin);
router.post('/admin/delete', lessonController.deleteLessonAdmin);
router.delete('/:id', lessonController.deleteLesson);
router.get('/:id/complete', lessonController.markLessonAsComplete);

module.exports = router;
