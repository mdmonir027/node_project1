const { body } = require('express-validator');

module.exports = [
  body('body')
    .not()
    .isEmpty()
    .withMessage('Comment should not be empty')
    .isLength({ max: 300 })
    .withMessage('Comment can not be greater than 300 chars'),
];
