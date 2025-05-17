
const User = require('../models/user.js')

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const data = {
      _id: user._id,
      username: user.username
    }
    res.send(data)
  } catch (error) {
    console.error('An error has occurred finding a user!', error.message)
  }
}



module.exports = {
  getUserById
}