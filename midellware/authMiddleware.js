// dependencies
const User = require('../models/User');

const middleware = {};

middleware.bindUserWithRequest = () => {
  return async (req, res, next) => {
    if (!req.session.isLoggedIn) return next();

    try {
      req.user = await User.findById(req.session.user._id);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

middleware.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/auth/login');
  }
  next();
};

middleware.isUnauthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/dashboard');
  }
  next();
};

module.exports = middleware;
