const driversController = require('./drivers-controller');
const express = require('express');
const route = express.Router();

module.exports = (app) => {
  app.use('/drivers', route);

  route.get('/profile', driversController.getDrivers);
  route.get('/:id', driversController.getDriver);
  route.post('/register', driversController.createDriver);
  route.put('/update', driversController.updateDriver);
  route.put('/status', driversController.updateStatus);
  route.delete('/', driversController.deleteDriver);
}