const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { homelessService } = params;

  router.get('/', async (request, response, next) => {
    try {
      return response.render('layout', {
        pageTitle: 'First Step',
        template: 'questions',
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
