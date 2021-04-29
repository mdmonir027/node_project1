const { body } = require('express-validator');
const cheerio = require('cheerio');

module.exports = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title can not be empty')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 chars'),
  body('body')
    .not()
    .isEmpty()
    .withMessage('Body can not be empty')
    .custom((value) => {
      const cheerioLoad = cheerio.load(value);
      const text = cheerioLoad.text();

      if (text.length >= 5000) {
        throw new Error('Body length cannot be greate than 5000 chars');
      }
      return true;
    })
    .trim(),
];
