// dependencies
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/errorValidationFormatter');
const Flash = require('../utils/Flash');

const controller = {};

controller.loginGet = (req, res, next) => {
  res.render('pages/auth/login', {
    pageTitle: 'Login Here',
    errors: {},
    flashMessage: Flash.getMessage(req),
    email: '',
  });
};

controller.loginPost = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('fail', 'There is some problem Check your form!');
    return res.render('pages/auth/login', {
      pageTitle: 'Login Here',
      errors: errors.formatWith(errorFormatter).mapped(),
      flashMessage: Flash.getMessage(req),
      email,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('fail', 'Please provide valid credentials');
      return res.render('pages/auth/login', {
        pageTitle: 'Login Here',
        errors: {},
        email,
        flashMessage: Flash.getMessage(req),
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      req.flash('fail', 'Please provide valid credentials');
      return res.render('pages/auth/login', {
        pageTitle: 'Login Here',
        errors: {},
        email,
        flashMessage: Flash.getMessage(req),
      });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((error) => {
      if (error) {
        return next(error);
      }
      req.flash('success', 'Successfully login');
      return res.redirect('/dashboard');
    });
  } catch (error) {
    next(error);
  }
};
controller.signupGet = (req, res, next) => {
  res.render('pages/auth/signup.ejs', {
    pageTitle: 'Create new account',
    errors: {},
    values: {},
    flashMessage: Flash.getMessage(req),
  });
};

controller.signupPost = async (req, res, next) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('fail', 'There is some problem! Check your form!');
    return res.render('pages/auth/signup', {
      pageTitle: 'Create new account',
      errors: errors.formatWith(errorFormatter).mapped(),
      values: { username, email, password },
      flashMessage: Flash.getMessage(req),
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    req.flash('success', 'Account created successfully');
    res.redirect('/auth/login');
  } catch (e) {
    next(e);
  }
};
controller.logout = (req, res, next) => {
  // res.json({ hello: 'h' });
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    return res.redirect('/auth/login');
  });
};

controller.editPassword = async (req, res, next) => {
  res.render('pages/auth/changePassword.ejs', {
    pageTitle: 'Change Password',
    errors: {},
    flashMessage: Flash.getMessage(req),
  });
};
controller.updatePassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('pages/auth/changePassword.ejs', {
      pageTitle: 'Change Password',
      errors: errors.formatWith(errorFormatter).mapped(),
      flashMessage: Flash.getMessage(req),
    });
  }

  try {
    const { oldPassword, newPassword } = req.body;

    const match = await bcrypt.compare(oldPassword, req.user.password);
    if (!match) {
      req.flash('fail', 'Invalid old password');
      return res.redirect('/auth/change-password');
    }

    const hash = await bcrypt.hash(newPassword, 11);

    await User.findByIdAndUpdate(req.user._id, { $set: { password: hash } });
    req.flash('success', 'Password updated Successfully!');
    return res.redirect('/auth/change-password');
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = controller;
