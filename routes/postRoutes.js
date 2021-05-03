const router = require('express').Router();
const {
  posts,
  create,
  store,
  edit,
  update,
  remove,
} = require('../controller/postController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const postValidator = require('../validator/post/postValidator');
const upload = require('../middleware/uploadMiddleware');

router.get('/', isAuthenticated, posts);
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
router.get('/delete/:id', isAuthenticated, remove);

module.exports = router;

// upload.single('post-image'),
