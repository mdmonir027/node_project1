module.exports = () => {
  return (req, res, next) => {
    // const user = { ...req.user._doc };
    // delete user.password;
    res.locals.user = req.user;
    res.locals.isLoggedIn = req.session.isLoggedIn;

    next();
  };
};
