const Profile = require('../../models/Profile');

const controller = {};

controller.bookmark = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      error: 'You are not an authenticated user',
    });
  }

  const { postId } = req.params;
  const userId = req.user._id;
  let bookmark = null;

  try {
    const profile = await Profile.findOne({ user: userId });

    if (profile.bookmarks.includes(postId)) {
      await Profile.findByIdAndUpdate(profile._id, {
        $pull: { bookmarks: postId },
      });
      bookmark = false;
    } else {
      await Profile.findByIdAndUpdate(profile._id, {
        $push: { bookmarks: postId },
      });
      bookmark = true;
    }

    res.status(200).json({ bookmark });
  } catch (e) {
    res.status(500).json({
      error: 'Server Error Occurred',
    });
  }
};

module.exports = controller;
