const express = require('express')
const router  = express.Router();

const authController = require('../controllers/authController.js');

router.post('/sign-up', authController.registerUser);
router.post('/sign-in', authController.signInUser);
router.get('/sign-out', authController.signOutUser);
router.put('/:id', authController.updatePassword);
router.post('/forget-password', authController.forgetPassword);

router.post('/admin-sign-in', authController.adminSignIn)

router.get('/sign-in', (req, res) => {
  res.render('./auth/sign-in.ejs',  {wrongPass: false});
});

router.get('/sign-up', (req, res) => {
  res.render('./auth/sign-up.ejs');
});

router.get('/:id/update-password', (req, res) => {
  res.render('./auth/update-password.ejs');
})

router.get('/forget-password', (req, res) => {
  res.render('./auth/forget-password.ejs')
})

const signInPageProps = {
  wrongPass: false,
  wrongCode: false
}  
router.get('/admin-sign-in', (req, res) => {
  res.render('./admin/a-sign-in.ejs', {signInPageProps});
})

router.get('/admin-dashboard', (req, res) => {
  res.render('./admin/a-dashboard.ejs');
})

router.get('/admin-add-lesson', (req, res) => {
  res.render('./admin/add-lesson.ejs');
})

router.get('/admin-delete-lesson', (req, res) => {
  res.render('./admin/delete-lesson.ejs');
})

module.exports = router;