const router = require('express').Router();
const { getAllPosts } = require('../controller/explorerController');

router.get('/', getAllPosts);

module.exports = router;
