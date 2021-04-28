const router = require('express').Router();
const { isAuthenticated } = require('../midellware/authMiddleware');
const upload = require('../midellware/uploadMiddelware');
const {
  uploadProfilePic,
  deleteProfilePic,
} = require('../controller/uploadController');

router.post(
  '/profilePic',
  isAuthenticated,
  upload.single('profilePic'),
  uploadProfilePic
);
router.delete('/profilePic', isAuthenticated, deleteProfilePic);

module.exports = router;
