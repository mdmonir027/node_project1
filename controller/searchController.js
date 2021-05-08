const Post = require('../models/Post');
const Flash = require('../utils/Flash');
const Profile = require('../models/Profile');

const controller = {};

controller.searchIndex = async (req, res, next) => {
  const { term } = req.query;
  const currentPage = parseInt(req.query.page) || 1;
  const itemPerPage = 10;

  try {
    const posts = await Post.find({
      $text: { $search: term },
    })
      .skip(currentPage * itemPerPage - itemPerPage)
      .limit(itemPerPage);

    const totalPost = await Post.countDocuments({
      $text: { $search: term },
    });
    const totalPage = totalPost / itemPerPage;

    return res.render('pages/explorer/search.ejs', {
      pageTitle: `Searched ${term}`,
      flashMessage: Flash.getMessage(req),
      searchTerm: term,
      posts,
      currentPage,
      itemPerPage,
      totalPost,
      totalPage,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = controller;
