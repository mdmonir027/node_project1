const router = require('express').Router();
const { authorIndex } = require('../controller/authorController');

router.get('/', authorIndex);
router.get('/:userId', authorIndex);

module.exports = router;
