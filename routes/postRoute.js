const router = require('express').Router();
const { create, storePost } = require('../controller/postController');
const { isAuthenticated } = require('../midellware/authMiddleware');
const postValidator = require('../validator/post/postValidator');
const upload = require('../midellware/uploadMiddelware');

router.get('/create', isAuthenticated, create);
router.post(
  '/create',
  isAuthenticated,
  upload.single('post-image'),
  postValidator,
  storePost
);

module.exports = router;

// upload.single('post-image'),
