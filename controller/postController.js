const Flash = require('../utils/Flash');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/errorValidationFormatter');

const controller = {};

controller.create = (req, res, next) => {
  res.render('pages/dashboard/post/createPost.ejs', {
    pageTitle: 'Create new post',
    flashMessage: Flash.getMessage(req),
    errors: {},
    post: {},
  });
};
controller.storePost = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req).formatWith(errorFormatter);

  const { title, body, tags } = req.body;

  //  ! form data not work when i add enctype=multipart-form-data in html form

  if (!errors.isEmpty()) {
    req.flash('success', 'Validation checked');
    return res.render('pages/dashboard/post/createPost.ejs', {
      pageTitle: 'Create new post',
      flashMessage: Flash.getMessage(req),
      errors: errors.mapped(),
      post: { title, body, tags },
    });
  }

  return res.render('pages/dashboard/post/createPost.ejs', {
    pageTitle: 'Create new post',
    flashMessage: Flash.getMessage(req),
    errors: {},
    post: {},
  });
};

module.exports = controller;
