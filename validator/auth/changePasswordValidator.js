const { body } = require('express-validator');

module.exports = [
  body('oldPassword')
    .not()
    .isEmpty()
    .withMessage('Please provide old password'),
  body('newPassword')
    .not()
    .isEmpty()
    .withMessage('Please provide new password')
    .isLength({ min: 6, max: 32 })
    .withMessage('Please provide a password between 6 to 32 chars '),
  body('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Please confirm your password')
    .isLength({ min: 6, max: 32 })
    .withMessage('Please provide a password between 6 to 32 chars ')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.newPassword) {
        throw new Error('Confirm password did not match');
      }

      return true;
    }),
];
