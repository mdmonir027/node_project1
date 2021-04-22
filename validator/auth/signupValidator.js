const { body } = require('express-validator');
const User = require('../../models/User');

module.exports = [
  body('username')
    .isLength({ min: 2, max: 15 })
    .withMessage('Username must be between 2 to 15 Chars')
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject('Username already used');
      }
      // return true; // * if not work in validation
    })
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid emaill')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (email) {
        if (user) {
          return Promise.reject('Email already used');
        }
        // return true; // * if not work in validation
      }
    })
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be greater than 6 char'),
  body('confirmPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be greater than 6 char')
    .custom((confrimPassword, { req }) => {
      if (confrimPassword !== req.body.password) {
        throw new Error("Password doesn'n matched");
      }
      return true;
    }),
];
