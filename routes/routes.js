const authRoutes = require('../routes/authRoutes');
const dashboarRoutes = require('../routes/dashboadRoutes');

const routes = [
  {
    path: '/auth',
    controller: authRoutes,
  },
  {
    path: '/dashboard',
    controller: dashboarRoutes,
  },
  {
    path: '/',
    controller: (req, res) => {
      res.json({
        message: 'working',
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((r) => {
    app.use(r.path, r.controller);
  });
};
