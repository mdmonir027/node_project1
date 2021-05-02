const authRoutes = require('../routes/authRoutes');
const dashboarRoutes = require('../routes/dashboadRoutes');
const uploadRoutes = require('./uploadRoute');
const postRoutes = require('./postRoute');
const apiRoutes = require('../api/routes/apiRoutes');

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
