const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  uploadProfilePic,
  deleteProfilePic,
  uploadPostImage,
} = require('../controller/uploadController');

router.post(
  '/profilePic',
  isAuthenticated,
  upload.single('profilePic'),
  uploadProfilePic
);
router.delete('/profilePic', isAuthenticated, deleteProfilePic);
router.post(
  '/postImage',
  isAuthenticated,
  upload.single('postImage'),
  uploadPostImage
);
module.exports = router;
