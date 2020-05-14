const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { dbquries } = params;

  router.get('/:service', async (request, response, next) => {
    try {
      const services = await dbquries.getServicesbyReason(request.params.service);
      return response.render('layout', {
        pageTitle: 'Services',
        template: 'Services',
        services,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
