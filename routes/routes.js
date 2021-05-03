const authRoutes = require('../routes/authRoutes');
const dashboardRoutes = require('../routes/dashboardRoutes');
const uploadRoutes = require('./uploadRoutes');
const postRoutes = require('./postRoutes');
const apiRoutes = require('../api/routes/apiRoutes');

const routes = [
  {
    path: '/auth',
    controller: authRoutes,
  },
  {
    path: '/dashboard',
    controller: dashboardRoutes,
  },
  {
    path: '/upload',
    controller: uploadRoutes,
  },
  {
    path: '/dashboard/posts',
    controller: postRoutes,
  },
  {
    path: '/api',
    controller: apiRoutes,
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
