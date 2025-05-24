const express = require('express')
const router  = express.Router();

const authController = require('../controllers/authController.js');

router.post('/sign-up', authController.registerUser);
router.post('/sign-in', authController.signInUser);
router.get('/sign-out', authController.signOutUser);
router.put('/:id', authController.updatePassword);

router.get('/sign-in', (req, res) => {
  res.render('./auth/sign-in.ejs',  {wrongPass: false});
});

router.get('/sign-up', (req, res) => {
  res.render('./auth/sign-up.ejs');
});

router.get('/:id/update-password', (req, res) => {
  res.render('./auth/update-password.ejs');
})

router.get('/auth/forget-password', (req, res) => {
  res.render('./auth/forget-password.ejs')
})

module.exports = router;