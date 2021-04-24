const authRoutes = require('../routes/authRoutes');
const dashboarRoutes = require('../routes/dashboadRoutes');
const playRoutes = require('../playground/play');

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
    path: '/play',
    controller: playRoutes,
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
    if (r.path === '/') {
      app.get(r.path, r.controller);
    } else {
      app.use(r.path, r.controller);
    }
  });
};
