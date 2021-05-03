const { body } = require('express-validator');
const cheerio = require('cheerio');
const { strToArr } = require('../../utils/stringUtils');

module.exports = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title can not be empty')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 chars')
    .trim(),
  body('body')
    .not()
    .isEmpty()
    .withMessage('Body can not be empty')
    .custom((value) => {
      const cheerioLoad = cheerio.load(value);
      const text = cheerioLoad.text();

      if (text.length >= 5000) {
        throw new Error('Body length cannot be greater than 5000 chars');
      }
      return true;
    })
    .trim(),
  body('tags')
    .not()
    .isEmpty()
    .withMessage('Tags can not be empty')
    .trim()
    .custom((value) => {
      const tagsArr = strToArr(value, ',');
      if (tagsArr.length > 10) {
        throw new Error('Tags must not be greater than 10');
      }
      return true;
    }),
];
