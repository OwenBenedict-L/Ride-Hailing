const express = require('express');
const estimationsController = require('./estimations-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/estimations', route);

  route.post('/', estimationsController.createEstimation);
  route.get('/surge-multiplier', estimationsController.getSurgeMultiplier);
  route.get('/:id', estimationsController.getEstimationById);
  route.put('/:id/route', estimationsController.updateEstimationRoute);
  route.delete('/:id', estimationsController.deleteEstimation);
};
