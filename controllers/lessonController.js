const User = require('../models/user.js')
const Lesson = require('../models/lesson.js')


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

module.exports = {
  addLesson
}