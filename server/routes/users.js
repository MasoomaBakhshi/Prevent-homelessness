const express = require('express');
const passport = require('passport');
const dbQuries = require('../services/dbQuries');
const middlewares = require('./middlewares');

const router = express.Router();

module.exports = (params) => {
  const { dbquries, images } = params;
  //if logged in
  function redirectIfLoggedIn(request, response, next) {
    if (request.user) return response.redirect('/users');
    return next();
  }
  // login post
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/users?success=Welcome',
      failureRedirect: '/users/login?error=Invalid email or password',
    })
  );
  //if loogged in route get
  router.get('/login', redirectIfLoggedIn, (request, response, next) => {
    try {
      if (request.query.error) {
        request.session.error = request.query.error;
      }
      if (request.query.success) {
        request.session.success = request.query.success;
      }
      const showerror = request.session.error;
      const showsuccess = request.session.success;
      request.session.error = '';
      request.session.success = '';
      return response.render('layout', {
        pageTitle: 'Login',
        template: './users/login',
        success: showsuccess,
        error: showerror,
      });
    } catch (err) {
      return next(err);
    }
  });
  //registration route get
  router.get('/registration', redirectIfLoggedIn, (request, response, next) => {
    try {
      const showerror = request.session.error;
      const showsuccess = request.session.success;
      request.session.error = '';
      request.session.success = '';
      return response.render('layout', {
        pageTitle: 'Registration',
        template: './users/registration',
        success: showsuccess,
        error: showerror,
      });
    } catch (err) {
      return next(err);
    }
  });
  //registration post
  router.post(
    '/registration',
    middlewares.upload.single('image'),
    middlewares.handleImage(images),
    async (request, response, next) => {
      try {
        const found = await dbquries.getEmail(request.body.email);
        if (found) {
          request.session.error =
            'Sorry, Email: ' + request.body.email + ' is already in database.';
          return response.redirect('/users/registration');
        }
        const savedUser = await dbquries.addUser(request);
        if (savedUser) {
          request.session.success = 'You have registred Successfully. please login.';
          return response.redirect('/users/login');
        }
        request.session.error = 'Sorry, you are not registered due to unknown reason';
        return response.redirect('/users');
      } catch (err) {
        if (request.file && request.file.storedFilename) {
          await images.delete(request.file.storedFilename);
        }
        return next(err);
      }
    }
  );
  ///image route
  router.get('/images/:filename', (request, response) => {
    response.type('png');
    return response.sendFile(images.filepath(request.params.filename));
  });

  ////image thumbnail
  router.get('/imagestn/:filename', async (request, response, next) => {
    try {
      response.type('png', 'jpg');
      const tn = await images.thumbnail(request.params.filename);
      return response.end(tn, 'binary');
    } catch (err) {
      return next(err);
    }
  });

  //dashboard page get
  router.get('/', async (request, response, next) => {
    try {
      const users = await dbquries.getUsers();
      const reasons = await dbquries.getReasons();
      const storedServices = await dbquries.storedServices();
      const services = await dbquries.getServices();
      if (request.query.error) {
        request.session.error = request.query.error;
      }
      if (request.query.success) {
        request.session.success = request.query.success;
      }
      const showerror = request.session.error;
      const showsuccess = request.session.success;
      request.session.error = '';
      request.session.success = '';
      if (request.user)
        return response.render('layout', {
          pageTitle: 'Dashboard',
          template: './users/admin',
          success: showsuccess,
          error: showerror,
          user: request.user,
          users: users,
          reasons: reasons,
          services: services,
          storedServices: storedServices,
        });

      return response.redirect('/users/login');
    } catch (err) {
      return next(err);
    }
  });
  //registration user post from admin
  router.post(
    '/adduser',
    middlewares.upload.single('image'),
    middlewares.handleImage(images),
    async (request, response, next) => {
      try {
        const found = await dbquries.getEmail(request.body.email);
        if (found) {
          request.session.error = 'Sorry, User ' + request.body.email + ' is already in database.';
          return response.redirect('/users');
        }
        const savedUser = await dbquries.addUser(request);
        if (savedUser) {
          request.session.success = 'User ' + request.body.email + ' is added.';
          return response.redirect('/users');
        }
        request.session.error =
          'Sorry, New user ' + request.body.email + ' is not added due to unknown reason';
        return response.redirect('/users');
      } catch (err) {
        if (request.file && request.file.storedFilename) {
          await images.delete(request.file.storedFilename);
        }
        return next(err);
      }
    }
  );
  //update a user
  router.post(
    '/updateuser/:id',
    middlewares.upload.single('image'),
    middlewares.handleImage(images),
    async (request, response, next) => {
      try {
        const update = await dbquries.updateUser(request, request.params.id);
        if (typeof update === 'string') {
          images.delete(update);
          request.session.success =
            'User ' + request.body.email + ' is updated with new text details and image.';
          return response.redirect('/users');
        }
        if (update === true) {
          request.session.success =
            'User ' + request.body.email + ' is updated with new text details.';
          return response.redirect('/users');
        }
        request.session.error =
          'Sorry, User ' + request.body.email + ' is not updated due to unknown reason';
        return response.redirect('/users');
      } catch (err) {
        if (request.file && request.file.storedFilename) {
          await images.delete(request.file.storedFilename);
        }
        if (err.code == '11000') {
          request.session.error =
            'Sorry, User is not updated. Either the User Email or ID is aleady in database. Email and ID should be unique.';
          return response.redirect('/users');
        }
        return next(err);
      }
    }
  );
  ///change password
  router.post('/updatepassword/:id', async (request, response, next) => {
    try {
      const update = await dbquries.updatePassword(request.body, request.params.id);
      if (update) {
        request.session.success = 'Password of User with ID# ' + request.params.id + ' is updated.';
        return response.redirect('/users');
      }
      request.session.error =
        'Sorry, User with ID# ' + request.params.id + ' is not updated with new password.';
      return response.redirect('/users');
    } catch (err) {
      return next(err);
    }
  });
  //delete a user
  router.get('/deleteuser/:id', async (request, response, next) => {
    try {
      const omit = await dbquries.deleteUser(request.params.id);
      if (typeof omit === 'string') {
        images.delete(omit);
        request.session.success =
          'User with ID# ' + request.params.id + ' is deleted with image from storage.';
        return response.redirect('/users');
      }
      if (omit === true) {
        request.session.success = 'User with ID# ' + request.params.id + ' is deleted.';
        return response.redirect('/users');
      }
      request.session.error =
        'Sorry, User with ID# ' + request.params.id + ' is not deleted due to unknown reason';
      return response.redirect('/users');
    } catch (err) {
      return next(err);
    }
  });
  //reason post from admin dashboard
  router.post('/addreason', async (request, response, next) => {
    try {
      const found = await dbquries.getReason(request.body.reason);
      if (found) {
        request.session.error = 'Sorry, Reason ' + request.body.reason + ' is already in database.';
        return response.redirect('/users');
      }
      if (!request.body.question) {
        request.session.error =
          'There should be atleast one question and service for ' +
          request.body.reason +
          ' to be stored in database.';
        return response.redirect('/users');
      }
      const savedReason = await dbquries.addReason(request.body);
      if (savedReason) {
        request.session.success = 'Reason ' + request.body.reason + ' is entered.';
        return response.redirect('/users');
      }
      request.session.error =
        'Sorry, Reason ' +
        request.body.reason +
        ' is not added due to unknown reason.  Please try again.';
      return response.redirect('/users');
    } catch (err) {
      return next(err);
    }
  });

  //update a reason
  router.post('/updatereason/:id', async (request, response, next) => {
    try {
      const update = await dbquries.updateReason(request.body, request.params.id);
      if (update) {
        request.session.success = 'Reason ' + request.body.reason + ' is updated.';
        return response.redirect('/users');
      }
      request.session.error =
        'Sorry, Reason ' +
        request.body.reason +
        ' is not updated due to unknown reason.  Please try again.';
      return response.redirect('/users');
    } catch (err) {
      if (err.code == '11000') {
        request.session.error =
          'Sorry, Reason is not updated. Either the Reason Name or ID is aleady in database. Name and ID should be unique.';
        return response.redirect('/users');
      }
      return next(err);
    }
  });
  //delete a reason
  router.get('/deletereason/:id', async (request, response, next) => {
    try {
      const omit = await dbquries.deleteReason(request.params.id);
      if (omit) {
        request.session.success = 'Reason with ID# ' + request.params.id + ' is deleted.';
        return response.redirect('/users');
      }
      request.session.error =
        'Sorry, Reason with ID# ' + request.params.id + ' is not deleted due to unknown reason';
      return response.redirect('/users');
    } catch (err) {
      return next(err);
    }
  });
  //service post from admin dashboard
  router.post(
    '/addservice',
    middlewares.upload.single('image'),
    middlewares.handleBigImage(images),
    async (request, response, next) => {
      try {
        const found = await dbquries.getService(request.body.organization);
        if (found) {
          request.session.error =
            'Sorry, Organization ' + request.body.organization + ' is already in database.';
          return response.redirect('/users');
        }
        const savedservice = await dbquries.addService(request);
        if (savedservice) {
          request.session.success = 'Organization ' + request.body.organization + ' is entered.';
          return response.redirect('/users');
        }
        request.session.error =
          'Sorry, Organization ' +
          request.body.organization +
          ' is not entered due to unknown reason. Please try again.';
        return response.redirect('/users');
      } catch (err) {
        if (request.file && request.file.storedFilename) {
          await images.delete(request.file.storedFilename);
        }
        return next(err);
      }
    }
  );
  //delete a service

  router.get('/deletservice/:id', async (request, response, next) => {
    try {
      const omit = await dbquries.deleteService(request.params.id);
      if (typeof omit === 'string') {
        images.delete(omit);
        request.session.success =
          'Organization with ID# ' + request.params.id + ' is deleted with image from storage.';
        return response.redirect('/users');
      }
      if (omit === true) {
        request.session.success = 'Organization with ID# ' + request.params.id + ' is deleted.';
        return response.redirect('/users');
      }
      request.session.error =
        'Sorry, Organization ' + request.params.id + ' is not deleted due to unknown reason';
      return response.redirect('/users');
    } catch (err) {
      return next(err);
    }
  });

  //update a service
  router.post(
    '/updateservice/:id',
    middlewares.upload.single('image'),
    middlewares.handleBigImage(images),
    async (request, response, next) => {
      try {
        const update = await dbquries.updateService(request, request.params.id);
        if (typeof update === 'string') {
          images.delete(update);
          request.session.success =
            'Organization ' +
            request.body.organization +
            ' is updated with new text details and image.';
          return response.redirect('/users');
        }
        if (update === true) {
          request.session.success =
            'Organization ' + request.body.organization + ' is updated with new text details.';
          return response.redirect('/users');
        }
        request.session.error =
          'Sorry Organization ' + request.body.organization + ' is  not update. Please try again.';
        return response.redirect('/users');
      } catch (err) {
        if (request.file && request.file.storedFilename) {
          await images.delete(request.file.storedFilename);
        }
        if (err.code == '11000') {
          request.session.error =
            'Sorry, Organization is not updated. Either the Organization Name or ID is aleady in database. Name and ID should be unique.';
          return response.redirect('/users');
        }
        return next(err);
      }
    }
  );

  // logout
  router.get('/logout', (request, response) => {
    request.logout();
    return response.redirect('/');
  });

  return router;
};
