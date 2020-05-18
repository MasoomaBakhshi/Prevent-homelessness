const express = require('express');
const questionsRoute = require('./questions');
const servicesRoute = require('./services');
const reasonsRoute = require('./reasons');

const router = express.Router();

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

  router.use('/questions', questionsRoute(params));
  router.use('/reasons', reasonsRoute(params));
  router.use('/services', servicesRoute(params));

  return router;
};
