// dependencies
const Flash = require('../utils/Flash');
const Profile = require('../models/Profile');

// scafollding
const controller = {};

controller.dashboard = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.redirect('/dashboard/create-profile');
    }
    res.render('pages/dashboard/dashboard.ejs', {
      pageTitle: 'My dashboard',
      flashMessage: Flash.getMessage(req),
    });
  } catch (e) {
    next(e);
  }
};

controller.createProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect('/dashboard/edit-profile');
    }
    res.render('pages/dashboard/createProfile.ejs', {
      pageTitle: 'Create your profile',
      flashMessage: Flash.getMessage(req),
    });
  } catch (e) {
    next(e);
  }
};

controller.storeProfile = (req, res, next) => {};

controller.editProfile = (req, res, next) => {
  res.render('pages/dashboard/editProfile.ejs');
};
controller.updateProfile = (req, res, next) => {};

module.exports = controller;
