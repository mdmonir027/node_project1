const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const config = require('config');

const { bindUserWithRequest } = require('./authMiddleware');
const setLocals = require('./setLocalsMiddleware');

const MONGODB_URI = config.get('db-uri');

var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2,
});

const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRECT_KEY || 'SECRET',
    resave: false,
    saveUninitialized: false,
    store,
  }),
  bindUserWithRequest(),
  setLocals(),
  flash(),
];

module.exports = (app) => app.use(middleware);
