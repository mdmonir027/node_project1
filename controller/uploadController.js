const Profile = require('../models/Profile');
const User = require('../models/User');
const fs = require('fs');

const controller = {};

controller.uploadProfilePic = async (req, res, next) => {
  if (req.file) {
    try {
      const oldProfilePic = req.user.profilePic;
      const profile = await Profile.findOne({ user: req.user._id });
      const profilePic = `/uploads/${req.file.filename}`;
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { profilePic } }
        );
      }

      await User.findByIdAndUpdate(req.user._id, { $set: { profilePic } });
      if (oldProfilePic !== '/uploads/default.png') {
        fs.unlink(`public${oldProfilePic}`, (err) => {
          if (err) console.log(err);
        });
      }

      res.status(200).json({ profilePic });
    } catch (e) {
      res.status(500).json({ profilePic: req.user.profilePic });
    }
  } else {
    res.status(500).json({ profilePic: req.user.profilePic });
  }
};

controller.deleteProfilePic = (req, res, next) => {
  try {
    fs.unlink(`public${req.user.profilePic}`, async () => {
      const profile = await Profile.findOne({ user: req.user._id });
      const defaultProfilePic = `/uploads/default.png`;
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { profilePic: defaultProfilePic } }
        );
      }

      await User.findByIdAndUpdate(req.user._id, {
        $set: { profilePic: defaultProfilePic },
      });
      res.status(200).json({ profilePic: defaultProfilePic });
    });
  } catch (e) {
    res.status(500).json({
      message: 'Can not remove profile pic',
    });
  }
};

controller.uploadPostImage = (req, res, next) => {
  if (req.file) {
    console.log('file uploading');
    return res.status(200).json({
      imageUrl: `/uploads/${req.file.filename}`,
    });
  }
  return res.status(500).json({
    message: 'Server Error',
  });
};

module.exports = controller;
