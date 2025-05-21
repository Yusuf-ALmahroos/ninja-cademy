const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const Course = require('../models/course');

// added route for dashboard

router.get('/dashboard', async (req, res) => {
  let user = req.session.user;
  if (!user) user = {};
  user.coursesEnrolled = user.coursesEnrolled || [];
  user.coursesFinished = user.coursesFinished || [];
  const allCourses = await Course.find();
  res.render('users/dashboard', { user, course: { courses: allCourses } });
});

router.get('/:id', userController.getUserById)
router.post('/enroll', userController.enrollCourse)

module.exports = router
