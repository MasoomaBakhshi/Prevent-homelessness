const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { RequiredServices } = params;

  router.get('/:service', async (request, response, next) => {
    try {
      const services = await RequiredServices.getservices(request.params.service);
      console.log(services);
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
