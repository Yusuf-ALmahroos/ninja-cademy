const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const QuizResult = require('../models/quizResult');

router.get('/:lessonId', async (req, res) => {
  const lessonId = req.params.lessonId;
  const questionIndex = parseInt(req.query.q) || 0;

  try {
    const questions = await Quiz.find({ lessonId: lessonId.toString() });

    console.log('Lesson ID:', lessonId);
    console.log('Questions found:', questions.length);

    if (!req.session.answers) {
      req.session.answers = {};
    }

    if (questionIndex >= questions.length) {
      return res.redirect(`/quiz/${lessonId}/submit`);
    }

    const question = questions[questionIndex];

    res.render('lessons/quiz-step', {
      lessonId,
      question,
      questionIndex,
      totalQuestions: questions.length,
      selected: req.session.answers[`q${questionIndex}`],
      user: req.session.user
    });

  } catch (err) {
    console.error(err);
    res.send('Error loading quiz');
  }
});

router.post('/:lessonId/next', (req, res) => {
  const { lessonId } = req.params;
  const { questionIndex, answer } = req.body;

  if (!req.session.answers) {
    req.session.answers = {};
  }

  req.session.answers[`q${questionIndex}`] = parseInt(answer);
  const nextIndex = parseInt(questionIndex) + 1;

  res.redirect(`/quiz/${lessonId}?q=${nextIndex}`);
});

router.get('/:lessonId/submit', async (req, res) => {
  const { lessonId } = req.params;
  const answers = req.session.answers || {};
  let score = 0;

  try {
    const questions = await Quiz.find({ lessonId: lessonId.toString() });

    questions.forEach((q, i) => {
      const userAnswer = answers[`q${i}`];
      if (userAnswer === q.correctAnswerIndex) {
        score++;
      }
    });

    await QuizResult.create({
      userId: req.session.user?._id || null,
      lessonId,
      score,
      total: questions.length
    });

    req.session.answers = null;

    res.render('lessons/result', {
      score,
      total: questions.length,
      lessonId, 
      user: req.session.user
    });

  } catch (err) {
    console.error(err);
    res.send('Error submitting quiz');
  }
});

module.exports = router;
