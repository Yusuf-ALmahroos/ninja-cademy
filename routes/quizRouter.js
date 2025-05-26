const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/:lessonId', quizController.getLessonQuiz);
router.post('/:lessonId/next', quizController.getNextQuestion);
router.get('/:lessonId/submit', quizController.submitQuiz);

module.exports = router;
