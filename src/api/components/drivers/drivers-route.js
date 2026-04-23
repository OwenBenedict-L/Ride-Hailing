const driversController = require('./drivers-controller');
const express = require('express');
const route = express.Router();

module.exports = (app) => {
  app.use('/drivers', route);

  route.get('/profile', driversController.getDrivers);
  route.get('/:id', driversController.getDriver);
  route.put('/:id', driversController.updateDriver);
  route.put('/changePassword', driversController.changePasswordDriver)
  route.get('/status/:id', driversController.getDriverStatus);
  route.delete('/:id', driversController.deleteDriver);
}