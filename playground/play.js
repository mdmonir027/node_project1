const router = require('express').Router();
const uploadMiddelware = require('../midellware/uploadMiddelware');

router.get('/play', (req, res, next) => {
  res.render('playground/play.ejs', {
    pageTitle: 'Validator Playground',
    flashMessage: {},
  });
});
router.post('/play', uploadMiddelware.single('file'), (req, res, next) => {
  // req.flash('fail', 'There is some error');
  res.redirect('/play/play');
});

module.exports = router;
