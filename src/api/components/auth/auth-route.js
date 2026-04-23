const express = require('express');
const authController = require('./auth-controller');
const driversController = require('../drivers/drivers-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  // Meng-register user
  route.post('/register', authController.register);

  // Meng-register driver
  route.post('/register/driver', driversController.registerDriver);

  // Masuk ke dalam user/driver
  route.post('/login', authController.login);

  // Endpoint khusus yang berfungsi untuk mengamankan data
  route.get('/protected', authMiddleware, authController.testProtected);
};
