const router = require('express').Router();
const { isAuthenticated } = require('../midellware/authMiddleware');
const upload = require('../midellware/uploadMiddelware');
const { uploadProfilePic } = require('../controller/uploadController');

router.post(
  '/profilePic',
  isAuthenticated,
  upload.single('profilePic'),
  uploadProfilePic
);

module.exports = router;
