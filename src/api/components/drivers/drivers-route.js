const driversController = require('./drivers-controller');
const express = require('express');
const route = express.Router();

module.exports = (app) => {
  app.use('/drivers', route);

  // Membuka profile yang berisi data-data driver
  route.get('/profile', driversController.getDrivers);

  // Melihat seluruh database drivers yang ada
  route.get('/:id', driversController.getDriver);

  // Meng-update data dari driver
  route.put('/:id', driversController.updateDriver);

  // Mengubah password dari driver
  route.put('/changePassword', driversController.changePasswordDriver)

  // Melihat status booking pada driver
  route.get('/status/:id', driversController.getDriverStatus);

  // Menghapus driver
  route.delete('/:id', driversController.deleteDriver);
}