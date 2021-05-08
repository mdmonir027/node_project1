const User = require('../models/User');
const Flash = require('../utils/Flash');
// scaffolding
const controller = {};

controller.authorIndex = async (req, res, next) => {
  const { userId } = req.params;

  const author = await User.findById(userId).populate({
    path: 'profile',
    populate: {
      path: 'posts',
    },
  });

  const profile = author.profile;

  res.render('pages/explorer/author.ejs', {
    pageTitle: 'author',
    flashMessage: Flash.getMessage(req),
    author,
    profile,
    profileLinks: profile.links,
    posts: author.profile.posts,
  });
};

module.exports = controller;
