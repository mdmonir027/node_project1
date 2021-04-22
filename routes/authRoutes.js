// dependencies
const router = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');
const loginValidator = require('../validator/auth/loginValidator');

const {
  loginGet,
  loginPost,
  signupGet,
  signupPost,
  logout,
} = require('../controller/authController');
const {
  isUnauthenticated,
  isAuthenticated,
} = require('../midellware/authMiddleware');

router.get('/login', isUnauthenticated, loginGet);
router.post('/login', isUnauthenticated, loginValidator, loginPost);
router.get('/signup', isUnauthenticated, signupGet);
router.post('/signup', isUnauthenticated, signupValidator, signupPost);
router.get('/logout', logout);

module.exports = router;
