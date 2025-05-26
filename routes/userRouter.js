const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const Course = require('../models/course');
const User = require('../models/user');

router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.session.user?._id;

    if (!userId) {
      return res.redirect('/auth/sign-in');
    }

    const user = await User.findById(userId)
      .populate('completedLessons')
      .exec();

    const allCourses = await Course.find()

    res.render('users/dashboard', {
      user,
      course: { courses: allCourses }
    });
  } catch (err) {
    console.error('Error loading dashboard:', err.message);
    res.send('Error loading dashboard');
  }
});

router.get('/:id', userController.getUserById);
router.post('/enroll', userController.enrollCourse);
router.get('/complete/:title', userController.completeCourse);

module.exports = router;
