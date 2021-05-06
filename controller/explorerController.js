// dependencies
const moment = require('moment');
const Flash = require('../utils/Flash');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// scaffolding
const controller = {};

// functions

const generateDate = (days) => {
  const date = moment().subtract(days, 'days');
  return date.toDate();
};

const generateFilterObject = (filter) => {
  let filterObject = {};
  let order = 1;

  switch (filter) {
    case 'week': {
      filterObject = {
        createdAt: {
          $gt: generateDate(7),
        },
      };
      order = -1;
      break;
    }
    case 'month': {
      filterObject = {
        createdAt: {
          $gt: generateDate(30),
        },
      };
      order = -1;
      break;
    }
    default: {
      order = -1;
      break;
    }
  }
  return {
    filterObject,
    order,
  };
};

controller.getAllPosts = async (req, res, next) => {
  const filter = req.query.filter || 'latest';
  const currentPage = parseInt(req.query.page) || 1;
  const itemPerPage = 10;

  const { filterObject, order } = generateFilterObject(filter.toLowerCase());

  try {
    const posts = await Post.find(filterObject)
      .populate('author', 'username')
      .sort(order === 1 ? '-createdAt' : 'createdAt')
      .skip(itemPerPage * currentPage - itemPerPage)
      .limit(itemPerPage);

    const totalPost = await Post.countDocuments();
    const totalPage = totalPost / itemPerPage;

    let bookmarks = [];
    if (req.user) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        bookmarks = profile.bookmarks;
      }
    }

    return res.render('pages/explorer/explorer.ejs', {
      pageTitle: 'My dashboard',
      flashMessage: Flash.getMessage(req),
      filter,
      posts,
      bookmarks,
      currentPage,
      itemPerPage,
      totalPost,
      totalPage,
    });
  } catch (e) {
    console.log(e); // todo remove later
    next(e);
  }
};

module.exports = controller;
