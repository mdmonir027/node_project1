const router = require('express').Router();
const profileValidation = require('../validator/dashboard/profileValidator');
const {
  dashboard,
  createProfile,
  storeProfile,
  editProfile,
  updateProfile,
} = require('../controller/dashboardController');
const { isAuthenticated } = require('../midellware/authMiddleware');

router.get('/', isAuthenticated, dashboard);

router.get('/create-profile', isAuthenticated, createProfile);
router.post(
  '/create-profile',
  isAuthenticated,
  profileValidation,
  storeProfile
);

router.get('/edit-profile', isAuthenticated, editProfile);
router.post('/edit-profile', isAuthenticated, profileValidation, updateProfile);

module.exports = router;
