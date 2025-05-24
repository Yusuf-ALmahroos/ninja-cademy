const bcrypt = require('bcrypt');
const User   = require('../models/user');
const Course = require('../models/course');

const AdminCodes = ["0000", "1212"];

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
      coursesFinished: [],
      isAdmin: false
    })

    res.render('./auth/sign-in.ejs', {wrongPass: false});
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

    user.isAdmin = false;
    await user.save();

    req.session.user = {
      email: user.email,
      _id: user._id,
      coursesEnrolled: user.coursesEnrolled,
      coursesFinished: user.coursesFinished,
      isAdmin: false
    }
    req.session.save();
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error('Error in sign in', error.message);
  }
}

const signOutUser = (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
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

const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user)
    {
      res.render('./auth/sign-up.ejs');
    }
    else
    {
      if(req.body.newPassword !== req.body.confirmPassword)
      {
        return res.send('Password doesnt match confirmm password');
      }
      const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12);
      user.password = hashedPassword;
      await user.save();
      res.render("./auth/confirm.ejs");
    }
    } catch (error) {
    console.error("error in forget passwird", error.message);
  }
}

const adminSignIn = async (req, res) => {
  try {
    const signInPageProps = {
      wrongPass: false,
      wrongCode: false
    }
    const user = await User.findOne({email: req.body.email})
    if(!user) {
      return res.send('No User Registerd with this email');
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
    if(!isValidPassword) {
      signInPageProps.wrongPass = true
      return res.render('./admin/a-sign-in.ejs', {signInPageProps});
    }

    if(!AdminCodes.includes(req.body.adminCode))
    {
      signInPageProps.wrongCode = true;
      return res.render('./admin/a-sign-in.ejs', {signInPageProps})
    }

    user.isAdmin = true;
    await user.save();

    req.session.user = {
      email: user.email,
      _id: user._id,
      coursesEnrolled: user.coursesEnrolled,
      coursesFinished: user.coursesFinished,
      isAdmin: true
    }

    req.session.save();
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error('Error in sign in', error.message);
  }
}

module.exports = {
  registerUser,
  signInUser,
  signOutUser,
  updatePassword,
  forgetPassword,
  adminSignIn
}