
const User = require('../models/user.js');
const Course = require('../models/course.js');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    const allCourses = await Course.find()
    res.render('./users/dashboard.ejs', { user, course: { courses: allCourses } });
    //.populate('coursesEnrolled')
    //.populate('coursesFinished');
  } catch (error) {
    console.error('An error has occurred finding a user!', error.message)
  }
}

const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    if(req.body.courses)
    {
      console.log((req.body.courses));
      const titles = req.body.courses;
      if(Array.isArray(titles)){

        titles.forEach((title) => {
        if(!user.coursesEnrolled.includes(title))
        {
          user.coursesEnrolled.push(title);
        }
      })
      } else {
        if(!user.coursesEnrolled.includes(titles))
        {
          user.coursesEnrolled.push(titles);
        }
      }   
    }
    user.save();
    req.session.user = {
      ...req.session.user,
      coursesEnrolled: user.coursesEnrolled,
    }
    req.session.save();
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error("error in enrolling course", error.message)
  }
}

module.exports = {
  getUserById,
  enrollCourse
}