const express = require('express');
const router = express.Router();
const servicesRoute = require('./services');
const reasonsRoute = require('./reasons');
const feedbackRoute = require('./feedback');
const usersRoute = require('./users');

module.exports = (params) => {
  const { homelessService } = params;

  router.get('/', async (request, response, next) => {
    try {
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/reasons', reasonsRoute(params));
  router.use('/services', servicesRoute(params));
  router.use('/feedback', feedbackRoute(params));
  router.use('/users', usersRoute(params));

  return router;
};
