// dependencies
const Flash = require('../utils/Flash');
const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');
const errorValidationFormatter = require('../utils/errorValidationFormatter');
const User = require('../models/User');
const Comment = require('../models/Comment');

// scaffolding
const controller = {};

controller.dashboard = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })
      .populate({
        path: 'posts',
        select: 'title thumbnail',
      })
      .populate({
        path: 'bookmarks',
        select: 'title thumbnail',
      });
    if (!profile) {
      return res.redirect('/dashboard/create-profile');
    }
    return res.render('pages/dashboard/dashboard.ejs', {
      pageTitle: 'My dashboard',
      flashMessage: Flash.getMessage(req),
      posts: profile.posts.reverse().slice(0, 3),
      bookmarks: profile.bookmarks.reverse().slice(0, 3),
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
      errors: {},
    });
  } catch (e) {
    next(e);
  }
};

controller.storeProfile = async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorValidationFormatter);

  if (!errors.isEmpty()) {
    return res.render('pages/dashboard/createProfile.ejs', {
      pageTitle: 'Create your profile',
      flashMessage: Flash.getMessage(req),
      errors: errors.mapped(),
    });
  }
  const { name, title, bio, website, facebook, twitter, github } = req.body;
  try {
    const profileInstance = new Profile({
      user: req.user._id,
      name,
      title,
      bio,
      profilePic: req.user.profilePic,
      links: {
        website: website || '',
        facebook: facebook || '',
        twitter: twitter || '',
        github: github || '',
      },
      posts: [],
      bookmarks: [],
    });

    const createdProfile = await profileInstance.save();

    await User.findByIdAndUpdate(req.user._id, {
      $set: { profile: createdProfile._id },
    });
    req.flash('success', 'Profile Created Successfully!');
    res.redirect('/dashboard');
  } catch (e) {
    next(e);
  }
};

controller.editProfile = async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id });

  res.render('pages/dashboard/editProfile.ejs', {
    pageTitle: 'Update your profile',
    flashMessage: Flash.getMessage(req),
    errors: {},
    profile,
  });
};
controller.updateProfile = async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorValidationFormatter);
  const { name, title, bio, website, facebook, twitter, github } = req.body;

  if (!errors.isEmpty()) {
    return res.render('pages/dashboard/createProfile.ejs', {
      pageTitle: 'Update your profile',
      flashMessage: Flash.getMessage(req),
      errors: errors.mapped(),
      profile: {
        name,
        title,
        bio,
        links: { website, facebook, twitter, github },
      },
    });
  }

  try {
    const profileObject = {
      name,
      title,
      bio,
      links: {
        website: website || '',
        facebook: facebook || '',
        twitter: twitter || '',
        github: github || '',
      },
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileObject },
      { new: true }
    );

    req.flash('success', 'Profile Updated Successfully!');
    return res.render('pages/dashboard/editProfile.ejs', {
      pageTitle: 'Update your profile',
      flashMessage: Flash.getMessage(req),
      errors: {},
      profile: updatedProfile,
    });
  } catch (e) {
    next(e);
  }
};

controller.bookmarkPosts = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate({
      path: 'bookmarks',
      model: 'Post',
    });

    res.render('pages/dashboard/post/bookmarks.ejs', {
      pageTitle: 'My Bookmark Post',
      flashMessage: Flash.getMessage(req),
      posts: profile.bookmarks,
    });
  } catch (e) {
    console.log(e); // todo remove later
    next(e);
  }
};

controller.comments = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    const comments = await Comment.find({ post: { $in: profile.posts } })
      .populate({
        path: 'post',
        select: 'title',
      })
      .populate({
        path: 'user',
        select: 'username profilePic',
      })
      .populate({
        path: 'replies.user',
        select: 'username profilePic',
      });

    // res.json(comments);

    res.render('pages/dashboard/comments.ejs', {
      pageTitle: 'All Comments',
      flashMessage: Flash.getMessage(req),
      comments,
    });
  } catch (e) {
    console.log(e); // todo remove later
    next(e);
  }
};

module.exports = controller;
