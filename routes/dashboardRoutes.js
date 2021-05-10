const router = require('express').Router();
const profileValidation = require('../validator/dashboard/profileValidator');
const {
  dashboard,
  createProfile,
  storeProfile,
  editProfile,
  updateProfile,
  bookmarkPosts,
  comments,
} = require('../controller/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/create-profile', isAuthenticated, createProfile);
router.post(
  '/create-profile',
  isAuthenticated,
  profileValidation,
  storeProfile
);

router.get('/edit-profile', isAuthenticated, editProfile);
router.post('/edit-profile', isAuthenticated, profileValidation, updateProfile);

router.get('/posts/bookmarks', isAuthenticated, bookmarkPosts);
router.get('/posts/comments', isAuthenticated, comments);

router.get('/', isAuthenticated, dashboard);

module.exports = router;
