const User = require('../models/user.js')
const Lesson = require('../models/lesson.js')
const Course = require('../models/course.js')
const mongoose = require('mongoose');

const addLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body)
     if (req.body.courseId) {  // added this to link lesson with course
      await Course.findByIdAndUpdate(
        req.body.courseId,
        { $push: { lessons: lesson._id } }
      );
    }

    res.send(lesson)
  } catch (error) {
    console.error('An error has occurred adding a lesson!', error.message)
  }
}

const showLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) {
      return res.status(404).send('Lesson not found');
    }
      res.render('./lessons/lessons.ejs', { lesson, course: req.body.courseTitle});
  } catch (error) {
    console.error('An error has occurred showing the lesson!', error.message);
  }
}

const addLessonAdmin = async (req, res) => {
    try {
    const course = await Course.findOne({title: req.body.courseTitle})
    if(!course)
    {
      return res.send("unknown course");
    }
    const lesson = await Lesson.create({
      title: req.body.title,
      content: req.body.content,
      description: req.body.description
    })
    if(lesson)
    {
      course.lessons.push(lesson._id)
      await course.save();
    }
    res.render('./admin/a-dashboard.ejs');
  } catch (error) {
    console.error('An error has occurred adding a lesson!', error.message)
  }
}

const deleteLessonAdmin = async (req, res) => {
  try {
    const course = await Course.findOne({title: req.body.courseTitle})
    if(!course) return res.send("course dosnt exist");
    const lesson = await Lesson.findOneAndDelete({title: req.body.title});
    if(!lesson) 
    {
      return res.send("lesson dosnt exist");
    }
    else
    {
      course.lessons.pop(lesson._id);
      await course.save();
    }
    res.render('./admin/a-dashboard.ejs');
  } catch (error) {
    console.log("error in admin delete course", error.message);
  }
}

const deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id)
  } catch (error) {
    res.send('Lesson has been deleted successfully!')
  }
}

const markLessonAsComplete = async (req, res) => {
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
}

module.exports = {
  addLesson,
  showLesson,
  addLessonAdmin,
  deleteLessonAdmin,
  deleteLesson,
  markLessonAsComplete
}