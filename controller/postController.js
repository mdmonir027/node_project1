const Flash = require('../utils/Flash');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/errorValidationFormatter');
const Post = require('../models/Post');
const { strToArr } = require('../utils/stringUtils');
const readingTime = require('reading-time');
const Profile = require('../models/Profile');
const fs = require('fs');

const controller = {};

controller.create = (req, res, next) => {
  res.render('pages/dashboard/post/createPost.ejs', {
    pageTitle: 'Create new post',
    flashMessage: Flash.getMessage(req),
    errors: {},
    post: {},
  });
};
controller.store = async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  const { title, body, tags } = req.body;

  if (!errors.isEmpty()) {
    return res.render('pages/dashboard/post/createPost.ejs', {
      pageTitle: 'Create new post',
      flashMessage: Flash.getMessage(req),
      errors: errors.mapped(),
      post: { title, body, tags },
    });
  }

  const post = new Post({
    title,
    body,
    author: req.user._id,
    tags: strToArr(tags, ','),
    thumbnail: '',
    readTime: readingTime(body).text,
    likes: [],
    dilikes: [],
    comments: [],
  });

  if (req.file) post.thumbnail = `/uploads/${req.file.filename}`;

  try {
    const createdPost = await post.save();
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { posts: createdPost._id } }
    );

    req.flash('success', 'Post created successfully!');
    return res.redirect(`/posts/edit/${createdPost._id}`);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

controller.edit = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ author: req.user._id, _id: id });
    if (!post) {
      const error = new Error('404 Page Not Found');
      error.status = 404;
      throw error;
    }

    return res.render('pages/dashboard/post/editPost.ejs', {
      pageTitle: 'Edit post',
      flashMessage: Flash.getMessage(req),
      errors: {},
      post,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
controller.update = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ author: req.user._id, _id: id });
    if (!post) {
      let error = new Error('404 Page Not Found');
      error.status = 404;
      throw error;
    }

    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
      return res.render('pages/dashboard/post/editPost.ejs', {
        pageTitle: 'Edit Post',
        flashMessage: Flash.getMessage(req),
        errors: errors.mapped(),
        post,
      });
    }

    const { title, body, tags } = req.body;

    const postData = {
      title,
      body,
      tags: strToArr(tags, ','),
      readTime: readingTime(body).text,
    };

    if (req.file) {
      fs.unlink(`public${post.thumbnail}`, (err) => {
        if (err) console.log(err);
      });
      postData.thumbnail = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await Post.findOneAndUpdate(
      { author: req.user._id, _id: id },
      { $set: postData },
      { new: true }
    );

    req.flash('success', 'Post updated successfully!');

    return res.render('pages/dashboard/post/editPost.ejs', {
      pageTitle: 'Edit post',
      flashMessage: Flash.getMessage(req),
      errors: {},
      post: updatedPost,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = controller;
