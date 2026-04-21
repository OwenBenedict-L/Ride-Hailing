const express = require('express');
const promosController = require('./promos-controller');
const authentication = require('../../middlewares/authentication');

const route = express.Router();

module.exports = (app) => {
  app.use('/promos', route);

  route.get('/', promosController.getActivePromos);
  route.post('/', authentication, promosController.createPromo);
  route.post('/validate', authentication, promosController.validatePromo);
  route.delete('/:id', authentication, promosController.deletePromo);
};
