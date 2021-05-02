const router = require('express').Router();
const { commentStore, replyStore } = require('../controller/commentController');
const { like, dislike } = require('../controller/likeDislikeController');
const { bookmark } = require('../controller/bookmarkController');
const { isAuthenticated } = require('../../midellware/authMiddleware');

router.post('/:postId/comment', isAuthenticated, commentStore);

router.post('/comment/:commentId/reply', isAuthenticated, replyStore);

router.post('/posts/:postId/like', isAuthenticated, like);
router.post('/posts/:postId/dislike', isAuthenticated, dislike);
router.get('/post/:postId/bookmark', isAuthenticated, bookmark);

module.exports = router;
