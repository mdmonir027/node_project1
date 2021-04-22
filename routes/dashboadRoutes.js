const router = require('express').Router();
const { dashboardGet } = require('../controller/dashboardController');
const { isAuthenticated } = require('../midellware/authMiddleware');

router.get('/', isAuthenticated, dashboardGet);

module.exports = router;
