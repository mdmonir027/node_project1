const router = require('express').Router();
const { searchIndex } = require('../controller/searchController');

router.get('/', searchIndex);

module.exports = router;
