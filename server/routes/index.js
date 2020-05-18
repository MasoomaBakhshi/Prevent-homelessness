const express = require('express');
const router = express.Router();
const servicesRoute = require('./services');
const reasonsRoute = require('./reasons');
const usersRoute = require('./users');

module.exports = (params) => {
  router.get('/', async (request, response, next) => {
    try {
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        user: request.user,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/reasons', reasonsRoute(params));
  router.use('/services', servicesRoute(params));
  router.use('/users', usersRoute(params));

  return router;
};
