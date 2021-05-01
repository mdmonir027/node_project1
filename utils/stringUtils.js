const validator = require('validator');

module.exports = {
  strToArr: (value, separator) => {
    if (!value || typeof value !== 'string') return [];
    const valueArray = value.split(separator);
    return valueArray.map((item) => validator.trim(item));
  },
};
