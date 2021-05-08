const authRoutes = require('../routes/authRoutes');
const dashboardRoutes = require('../routes/dashboardRoutes');
const uploadRoutes = require('./uploadRoutes');
const postRoutes = require('./postRoutes');
const apiRoutes = require('../api/routes/apiRoutes');
const explorerRoutes = require('./explorerRoutes');
const searchRoutes = require('./searchRoutes');
const authorRoutes = require('./authorRoutes');

// single controller
const { getAllPosts } = require('../controller/explorerController');

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
    path: '/post',
    controller: explorerRoutes,
  },
  {
    path: '/search',
    controller: searchRoutes,
  },
  {
    path: '/author',
    controller: authorRoutes,
  },
  {
    path: '/',
    controller: getAllPosts,
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
