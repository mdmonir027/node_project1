const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

const controller = {};

controller.commentStore = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      error: 'You are not an authenticated user',
    });
  }

  try {
    const { postId } = req.params;
    const userId = req.user._id;
    const { body } = req.body;

    const commentInstance = new Comment({
      post: postId,
      user: userId,
      body,
      replies: [],
    });

    const createdComment = await commentInstance.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: createdComment._id },
    });

    const commentJson = await Comment.findById(createdComment._id).populated({
      path: 'user',
      select: 'profilePic, username',
    });

    return res.status(201).json(commentJson);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: 'Server Error Occurred',
    });
  }
};

controller.replyStore = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      error: 'You are not an authenticated user',
    });
  }

  try {
    const { commentId } = req.params;
    const { body } = req.body;

    const reply = { body, user: req.user._id };

    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: reply },
    });

    res.status(201).json({
      ...reply,
      profilePic: req.user.profilePic,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: 'Server Error Occurred',
    });
  }
};

module.exports = controller;
