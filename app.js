require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// CONFIG
const MONGODB_URI = process.env.DB_URI;

// middleware imports
const { bindUserWithRequest } = require('./midellware/authMiddleware');
const setLocals = require('./midellware/setLocalsMiddleware');

// routes imports
const authRoutes = require('./routes/authRoutes');
const dashboarRoutes = require('./routes/dashboadRoutes');

// SESSIONS
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2,
});

// playground // todo remove whole section
// const playRoutes = require('./playground/validator');

//  app scafollding
const app = express();

// set morgan for development
if (app.get('env').toLowerCase() === 'development') {
  app.use(morgan('dev'));
}

// view engine with ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// middlewares arrray
const middleware = [
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRECT_KEY || 'SECRET',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
  flash(),
];

app.use(middleware);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboarRoutes);
// app.use('/play', playRoutes); // todo remove later

app.get('/', (req, res) => {
  res.json({
    message: 'working',
  });
});

let PORT = process.env.NODE_PORT || 9000;

mongoose
  .connect(MONGODB_URI, {
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
