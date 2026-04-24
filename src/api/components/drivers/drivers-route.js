const { authMidDriver } = require('../../middlewares');
const driversController = require('./drivers-controller');
const express = require('express');
const route = express.Router();

module.exports = (app) => {
  app.use('/drivers', route);

  // Membuka profile yang berisi data driver-driver
  route.get('/profile', driversController.getDrivers);

  // Mengubah password dari driver
  route.put('/changePassword', authMidDriver, driversController.changePasswordDriver)

  // Melihat seluruh database drivers yang ada
  route.get('/:id', driversController.getDriver);

  // Meng-update data dari driver
  route.put('/:id', driversController.updateDriver);

  // Melihat status booking pada driver
  route.get('/status/:id', driversController.getDriverStatus);

  // Menghapus driver
  route.delete('/:id', driversController.deleteDriver);
}