const { body } = require('express-validator');

module.exports = [
  body('body')
    .not()
    .isEmpty()
    .withMessage('Reply should not be empty')
    .isLength({ max: 300 })
    .withMessage('Reply can not be greater than 300 chars'),
];
