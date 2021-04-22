const router = require('express').Router();
const flash = require('./../utils/Flash');

router.get('/validator', (req, res, next) => {
  console.log(flash.getMessage(req));
  res.render('playground/signup', {
    pageTitle: 'Validator Playground',
    flashMessage: {},
  });
});
router.post('/validator', (req, res, next) => {
  // req.flash('fail', 'There is some error');
  res.redirect('/play/validator');
});

module.exports = router;
