const bcrypt = require('bcrypt');
const User   = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const userInDb = await User.findOne({email: req.body.email})
    if(userInDb) {
      return res.send('user already exists');
    }

    if(req.body.password !== req.body.confirmPassword) {
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

const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(!user) {
      return res.send('No User Registerd with this email');
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
    if(!isValidPassword) {
      return res.render('./auth/sign-in.ejs', {wrongPass: true});
    }

    req.session.user = {
      email: user.email,
      _id: user._id
    }

    res.render(`./users/dashboard.ejs`)
  } catch (error) {
    console.error('Error in sign in', error.message);
  }
}

const signOutUser = (req, res) => {
  try {
    req.session.destroy();
    res.send("you signed out");
  } catch (error) {
    console.error("error in sign out", error.message);
  }
}

const updatePassword  = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      return res.send("No user with this ID");
    }
    if(req.body.newPassword !== req.body.confirmPassword)
    {
      return res.send('Password doesnt match confirmm password');
    }

    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    res.render("./auth/confirm.ejs");
  } catch (error) {
    console.error("error in updating the password", error.message)
  }
}
module.exports = {
  registerUser,
  signInUser,
  signOutUser,
  updatePassword
}