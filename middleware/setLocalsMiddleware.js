const cheerio = require('cheerio');
const moment = require('moment');

module.exports = () => {
  return (req, res, next) => {
    // const user = { ...req.user._doc };
    // delete user.password;
    res.locals.user = req.user;
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.truncate = (html) => {
      console.log(html);
      let node = cheerio.load(html);
      let text = node.text() || html;

      text = text.replace(/(\r\r|\n|\r)/gm, '');

      if (text.length <= 100) return text;
      return text.substr(0, 100) + '...';
    };

    res.locals.fromNowTime = (time) => moment(time).fromNow();

    next();
  };
};
