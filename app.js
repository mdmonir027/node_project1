// dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

const setMiddleware = require('./middleware/middleware');
const setRoutes = require('./routes/routes');

// app scaffolding
const app = express();

// view engine with ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

setMiddleware(app);
setRoutes(app);

// todo uncomment later <
// app.use((req, res, next) => {
//   const error = new Error('404 Not Found');
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   if (error.status === 404) {
//     return res.render('pages/error/404', { flashMessage: {} });
//   }
//   return res.render('pages/error/505', { flashMessage: {} });
// });
// todo uncomment later >

const PORT = config.get('port');

mongoose
  .connect(config.get('db-uri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(chalk.white.bgGreen('Database connected'));
    app.listen(PORT, () => {
      console.log(chalk.white.bgBlue(`Server is running on port ${PORT}`));
    });
  })
  .catch((e) => {
    console.log(e);
  });
