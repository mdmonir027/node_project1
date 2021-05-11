// dependencies
const router = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');
const loginValidator = require('../validator/auth/loginValidator');
const passwordValidator = require('../validator/auth/changePasswordValidator');

const {
  loginGet,
  loginPost,
  signupGet,
  signupPost,
  logout,
  editPassword,
  updatePassword,
} = require('../controller/authController');
const {
  isUnauthenticated,
  isAuthenticated,
} = require('../middleware/authMiddleware');

router.get('/login', isUnauthenticated, loginGet);
router.post('/login', isUnauthenticated, loginValidator, loginPost);

router.get('/signup', isUnauthenticated, signupGet);
router.post('/signup', isUnauthenticated, signupValidator, signupPost);

router.get('/change-password', isAuthenticated, editPassword);
router.post(
  '/change-password',
  isAuthenticated,
  passwordValidator,
  updatePassword
);

router.get('/logout', isAuthenticated, logout);

module.exports = router;
