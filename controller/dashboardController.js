// dependencies
const Flash = require('../utils/Flash');

// scafollding
const controller = {};

controller.dashboardGet = (req, res, next) => {
  res.render('pages/dashboard/dashboard.ejs', {
    pageTitle: 'My dashboard',
    flashMessage: Flash.getMessage(req),
  });
};

module.exports = controller;
