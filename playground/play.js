const router = require('express').Router();
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.get('/play', (req, res, next) => {
  res.render('playground/play.ejs', {
    pageTitle: 'Validator Playground',
    flashMessage: {},
  });
});
router.post('/play', uploadMiddleware.single('file'), (req, res, next) => {
  // req.flash('fail', 'There is some error');
  res.redirect('/play/play');
});

module.exports = router;
