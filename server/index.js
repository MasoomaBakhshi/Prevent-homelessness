const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const createError = require('http-errors');
const bodyParser = require('body-parser');
const compression = require('compression');
const auth = require('./lib/auth');
const routes = require('./routes');
const dbQuries = require('./services/dbQuries');
const ImageService = require('./services/ImageService');

module.exports = (config) => {
  const dbquries = new dbQuries();
  const images = new ImageService(config.data.images);

  const app = express();
  app.use(compression());
  app.use(helmet());
  app.locals.title = config.sitename;

  app.use('/', express.static(path.join(__dirname, '../public')));
  app.get('/favicon.ico', (req, res) => res.sendStatus(204));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    session({
      secret: 'MasoomaBakhshi',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      cookie: {},
    })
  );
  app.use(auth.initialize);
  app.use(auth.session);
  app.use(auth.setUser);

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, './views'));

  app.use(
    '/',
    routes({
      dbquries,
      images,
    })
  );

  app.use((request, response, next) => {
    return next(createError(404, 'File not found'));
  });

  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

  app.use((err, request, response, next) => {
    response.locals.message = err.message;
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
  });

  return app;
};
