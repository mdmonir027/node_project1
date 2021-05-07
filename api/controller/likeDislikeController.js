const Post = require('../../models/Post');

const controller = {};

controller.like = async (req, res) => {
  console.log('like control');
  if (!req.user) {
    return res.status(403).json({
      error: 'You are not an authenticated user',
    });
  }
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    let liked = null;

    const post = await Post.findById(postId);
    if (post.dislikes.includes(userId)) {
      await Post.findByIdAndUpdate(postId, { $pull: { dislikes: userId } });
    }

    if (post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      liked = false;
    } else {
      await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
      liked = true;
    }

    const updatedPost = await Post.findById(postId);

    res.status(200).json({
      liked,
      totalLikes: updatedPost.likes.length,
      totalDislikes: updatedPost.dislikes.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: 'Server Error Occurred',
    });
  }
};

controller.dislike = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      error: 'You are not an authenticated user',
    });
  }
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    let disliked = null;

    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
    }

    if (post.dislikes.includes(userId)) {
      await Post.findByIdAndUpdate(postId, { $pull: { dislikes: userId } });
      disliked = false;
    } else {
      await Post.findByIdAndUpdate(postId, { $push: { dislikes: userId } });
      disliked = true;
    }

    const updatedPost = await Post.findById(postId);

    return res.status(200).json({
      disliked,
      totalLikes: updatedPost.likes.length,
      totalDislikes: updatedPost.dislikes.length,
    });
  } catch (e) {
    res.status(500).json({
      error: 'Server Error Occurred',
    });
  }
};

module.exports = controller;
