const User = require('../models/user.js')
const Course = require('../models/course.js')


const addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.send(course)
  } catch (error) {
    console.error(req.body)
    console.error('An error has occurred adding a course!', error.message)
  }
}

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
    res.send(courses)
  } catch (error) {
    console.error('An error has occurred retrieving your courses!', error.message)
  }
}

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.send(course)
  } catch (error) {
    console.error('An error has occurred retrieving the specified course!', error.message)
  }
}

const updateCourseStatus = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(course)
  } catch (error) {
    console.error('An error has occurred updating a course!', error.message)
  }
}

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
  } catch (error) {
    res.send(`Course has been deleted successfully!`)
  }
}
module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseStatus,
  deleteCourse
}