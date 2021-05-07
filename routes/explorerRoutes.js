const router = require('express').Router();
const { getAllPosts, singlePost } = require('../controller/explorerController');

router.get('/:postId', singlePost);

router.get('/', getAllPosts);

module.exports = router;
