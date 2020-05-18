const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { homelessService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const reasons = await homelessService.getReasons();
      return response.render('layout', {
        pageTitle: 'Reasons',
        template: 'reasons',
        reasons,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const questions = await homelessService.getQuestionsForReason(request.params.shortname);
      console.log(questions);
      return response.render('layout', {
        pageTitle: 'More Detail',
        template: 'details',
        questions,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
