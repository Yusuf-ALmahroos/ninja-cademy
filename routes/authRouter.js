const express = require('express')
const router  = express.Router();

const authController = require('../controllers/authController.js');

function test(req, res)
{

}

router.post('/sign-up', authController.registerUser);
router.post('/sign-in', test);
router.get('/sign-out', test);

router.get('/sign-in', (req, res) => {
  res.render('./auth/sign-in.ejs');
});

router.get('/sign-up', (req, res) => {
  res.render('./auth/sign-up.ejs');
});

module.exports = router;