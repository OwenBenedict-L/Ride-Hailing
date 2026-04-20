const express = require('express');
const usersController = require('./users-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/profile', authMiddleware, usersController.getProfile);

  route.put('/profile', authMiddleware, usersController.updateProfile);

  route.put('/change-password', authMiddleware, usersController.changePassword);

  route.get('/', usersController.getUsers);

  route.get('/:id', usersController.getUser);

  route.put('/:id', usersController.updateUser);

  route.delete('/:id', usersController.deleteUser);
};
