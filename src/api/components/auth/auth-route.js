const express = require('express');
const authController = require('./auth-controller');
const driversController = require('../drivers/drivers-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/register', authController.register);
  route.post('/registerDriver', driversController.registerDriver);
  route.post('/login', authController.login);
  route.get('/protected', authMiddleware, authController.testProtected);
};
