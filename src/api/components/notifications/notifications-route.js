const express = require('express');

const notificationsController = require('./notifications-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/api/notifications', route);

  // Mengambil semua notifikasi user
  route.get('/', notificationsController.getNotifications);

  // Mengirim notifikasi yang baru
  route.post('/', notificationsController.createNotification);

  // Menghapus semua riwayat notifikasi
  route.delete('/clear', notificationsController.clearNotifications);
};
