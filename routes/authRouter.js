const express = require('express')
const router  = express.Router();

const authController = require('../controllers/authController.js');

router.post('/sign-up', authController.registerUser);
router.post('/sign-in', authController.signInUser);
router.get('/sign-out', authController.signOutUser);
router.put('/:id', authController.updatePassword);

router.get('/sign-in', (req, res) => {
  res.render('./auth/sign-in.ejs');
});

router.get('/sign-up', (req, res) => {
  res.render('./auth/sign-up.ejs');
});

module.exports = router;