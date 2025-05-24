const User = require('../models/user.js')
const Course = require('../models/course.js')
const Lesson = require('../models/lesson.js')

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
    const allCourses = await Course.find()
    .populate('lessons')  // <-- added this to show lesson
    res.render('courses/all.ejs', { courses: allCourses });
  } catch (error) {
    console.error("error in getting all courses", error.message)
  }          
}

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.render('./courses/course.ejs', {course});
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
    res.send('Course has been deleted successfully!')
  }
}

const getCourseByTitle = async (req, res) => {
  try {
    const course = await Course.findOne({title: req.params.title})
    const stringIds = course.lessons.map(id => id.toString())
    const lessons = await Lesson.find({ _id: { $in: stringIds} })
    const lessonsTitles = lessons.map(lesson => lesson.title);
    res.render('./courses/course.ejs', {course, lessonsTitles});
  } catch (error) {
    console.error("error finding course by title", error.message);
  }
}

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseStatus,
  deleteCourse,
  getCourseByTitle
}