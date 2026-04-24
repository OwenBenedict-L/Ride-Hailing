const express = require('express');
const promosController = require('./promos-controller');
const { authMiddleware } = require('../../middlewares/authentication');

const route = express.Router();

module.exports = (app) => {
  app.use('/promos', route);

  route.get('/', promosController.getActivePromos);
  route.post('/', authMiddleware, promosController.createPromo);
  route.post('/validate', authMiddleware, promosController.validatePromo);
  route.delete('/:id', authMiddleware, promosController.deletePromo);
};
