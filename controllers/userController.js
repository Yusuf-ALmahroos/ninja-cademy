
const User = require('../models/user.js')

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const data = {
      _id: user._id,
      username: user.username
    }
    res.render("./users/dashboard.ejs")
  } catch (error) {
    console.error('An error has occurred finding a user!', error.message)
  }
}

const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    console.log(req.body.courses);
    res.send(user)
    //user.coursesEnrolled.push()
  } catch (error) {
    console.error("error in enrolling course", error.message)
  }
}

module.exports = {
  getUserById,
  enrollCourse
}