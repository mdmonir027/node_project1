const { body } = require('express-validator');
const validator = require('validator');

// functions
const linkValidator = (value) => {
  if (value) {
    if (!validator.isURL(value)) {
      throw new Error('Please provide a valid url');
    }
  }
  return true;
};

module.exports = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name can not be empty')
    .isLength({ max: 30 })
    .withMessage('Name must be less than 30 chars'),
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title can not be empty')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 chars'),
  body('bio')
    .not()
    .isEmpty()
    .withMessage('Bio can not be empty')
    .isLength({ max: 500 })
    .withMessage('Title must be less than 500 chars'),
  body('website').custom(linkValidator),
  body('facebook').custom(linkValidator),
  body('twitter').custom(linkValidator),
  body('github').custom(linkValidator),
];
