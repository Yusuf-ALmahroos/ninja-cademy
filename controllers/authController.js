const bcrypt = require('bcrypt');
const User   = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const userInDb = await User.findOne({email: req.body.email})
    if(userInDb)
    {
      return res.send('user already exists');
    }

    if(req.body.password !== req.body.confirmPassword)
    {
      return res.send('Password and Confirm Password must macth');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      coursesEnrolled: [],
      coursesFinished: []
    })

    res.send(user)
  } catch (error) {
    console.error("error in registering", error.message);
  }
}

module.exports = {
  registerUser,
}