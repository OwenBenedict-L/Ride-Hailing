const driversController = require('./drivers-controller');
const express = require('express');
const route = express.Router();

module.exports = (app) => {
  app.use('/drivers', route);

  route.get('/profile', driversController.getDrivers);
  route.get('/:id', driversController.getDriver);
  route.put('/:idgi', driversController.updateDriver);
  route.put('/changePassword', driversController.changePasswordDriver)
  route.put('/:id/status', driversController.updateStatus);
  route.delete('/:id', driversController.deleteDriver);
}