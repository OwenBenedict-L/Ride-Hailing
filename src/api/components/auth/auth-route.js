<<<<<<< HEAD
const express = require('express');
=======
const express = require('express')
>>>>>>> d19c15ede408254d66d580f64098b18e586646e9
const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
<<<<<<< HEAD
  app.use('/auth', route);

  route.post('/register', authController.register);
  route.post('/login', authController.login);
  route.get('/protected', authMiddleware, authController.testProtected);
};
=======
    app.use('/auth', route);

    route.post('/loginDriver', authController.loginDriver);
    route.get('/protectedDriver', authMiddleware, authController.testProtectedDriver);
};
>>>>>>> d19c15ede408254d66d580f64098b18e586646e9
