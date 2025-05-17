const User = require('../models/user.js')
const Course = require('../models/course.js')


const addCourse = async (req, res) => {
  try {
    const user = await User.findById(req.body.author)
    const course = await Course.create(req.body)
    user.courses.push(course._id)
    user.save()
    res.send(course)
  } catch (error) {
    console.error('An error has occurred adding a course!', error.message)
  }
}

module.exports = {
  addCourse
}