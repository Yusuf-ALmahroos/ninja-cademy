const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController.js');
const Lesson = require('../models/lesson');
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/:lessonId', lessonController.showLesson);
router.post('/', lessonController.addLesson);
router.post('/admin/add', lessonController.addLessonAdmin);
router.post('/admin/delete', lessonController.deleteLessonAdmin);
router.delete('/:id', lessonController.deleteLesson);

router.get('/:id/complete', async (req, res) => {
  try {
    const lessonId = req.params.id;
    const userId = req.session.user?._id;

    if (!userId) {
      return res.redirect('/auth/sign-in');
    }

    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);

    await User.findByIdAndUpdate(userId, {
      $addToSet: { completedLessons: lessonObjectId }
    });

    console.log(`✅ User ${userId} marked lesson ${lessonId} as complete`);

    res.redirect('/users/dashboard');
  } catch (err) {
    console.error('❌ Error marking lesson complete:', err.message);
    res.status(500).send('Error marking lesson as complete.');
  }
});

module.exports = router;
