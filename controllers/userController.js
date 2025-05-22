
const User = require('../models/user.js')

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
  .populate('coursesEnrolled')
  .populate('coursesFinished');
    res.render("./users/dashboard.ejs")
  } catch (error) {
    console.error('An error has occurred finding a user!', error.message)
  }
}

const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)

    if(req.body.courses)
    {
      if(Array.isArray(req.body.courses)){
        user.coursesEnrolled.push(...req.body.courses);
      } else {
        user.coursesEnrolled.push(req.body.courses);
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