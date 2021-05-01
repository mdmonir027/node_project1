const router = require('express').Router();
const { create, store, edit, update } = require('../controller/postController');
const { isAuthenticated } = require('../midellware/authMiddleware');
const postValidator = require('../validator/post/postValidator');
const upload = require('../midellware/uploadMiddelware');

router.get('/create', isAuthenticated, create);
router.post(
  '/create',
  isAuthenticated,
  upload.single('post-image'),
  postValidator,
  store
);
router.get('/edit/:id', isAuthenticated, edit);
router.post(
  '/edit/:id',
  isAuthenticated,
  upload.single('post-image'),
  postValidator,
  update
);

module.exports = router;

// upload.single('post-image'),
