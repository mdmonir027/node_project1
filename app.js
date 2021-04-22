require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const setMiddleware = require('./midellware/middleware');
const setRoutes = require('./routes/routes');

const app = express();

// view engine with ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

setMiddleware(app);
setRoutes(app);

const PORT = config.get('port');

mongoose
  .connect(config.get('db-uri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
