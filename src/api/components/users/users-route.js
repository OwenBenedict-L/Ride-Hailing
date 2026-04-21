const express = require('express');
const usersController = require('./users-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);
<<<<<<< HEAD

  route.get('/profile', authMiddleware, usersController.getProfile);

  route.put('/profile', authMiddleware, usersController.updateProfile);

  route.put('/change-password', authMiddleware, usersController.changePassword);

  route.get('/', usersController.getUsers);

  route.get('/:id', usersController.getUser);

  route.put('/:id', usersController.updateUser);

=======
  route.get('/', usersController.getUsers);
  route.post('/', usersController.createUser);
  route.get('/:id', usersController.getUser);
  route.put('/:id', usersController.updateUser);
  route.put('/:id/change-password', usersController.changePassword);
>>>>>>> d19c15ede408254d66d580f64098b18e586646e9
  route.delete('/:id', usersController.deleteUser);
};
