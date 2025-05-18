const User = require('../models/user.js')
const Lesson = require('../models/lesson.js')


const addLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body)
    user.lessons.push(lesson._id)
    res.send(lesson)
  } catch (error) {
    console.error('An error has occurred adding a lesson!', error.message)
  }
}

module.exports = {
  addLesson
}