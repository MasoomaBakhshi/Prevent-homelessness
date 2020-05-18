const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { dbquries } = params;

  router.get('/', async (request, response, next) => {
    try {
      const reasons = await dbquries.getReasons();
      return response.render('layout', {
        pageTitle: 'Reasons',
        template: 'reasons',
        reasons,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:reason', async (request, response, next) => {
    try {
      if (request.params.reason === 'all') {
        try {
          const reason = await dbquries.getReasons();
          return response.render('layout', {
            pageTitle: 'More Detail',
            template: 'details-all',
            reason,
          });
        } catch (err) {
          return next(err);
        }
      } else {
        try {
          const reason = await dbquries.getReason(request.params.reason);
          return response.render('layout', {
            pageTitle: 'More Detail',
            template: 'details',
            reason,
          });
        } catch (err) {
          return next(err);
        }
      }
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
