const e = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');

const controller = {};

controller.uploadProfilePic = async (req, res, next) => {
  if (req.file) {
    try {
      const profile = await Profile.findOne({ user: req.user._id });
      const profilePic = `/uploads/${req.file.filename}`;
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { profilePic } }
        );
      }

      await User.findByIdAndUpdate(req.user._id, { $set: { profilePic } });
      res.status(200).json({ profilePic });
    } catch (e) {
      res.status(500).json({ profilePic: req.user.profilePic });
    }
  } else {
    res.status(500).json({ profilePic: req.user.profilePic });
  }
};

module.exports = controller;
