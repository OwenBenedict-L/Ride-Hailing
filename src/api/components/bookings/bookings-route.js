const express = require('express');

const bookingsController = require('./bookings-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/api/bookings', route);

  // Mengambil riwayat daftar pesanan
  route.get('/history', bookingsController.getHistory);

  // Mengambil booking yang sedang berjalan
  route.get('/actives', bookingsController.getActives);

  // Membuat pesanan baru
  route.post('/', bookingsController.createBooking);

  // Memperbarui data pesanan (update status/assign driver)
  route.put('/:id', bookingsController.updateBooking);

  // Membatalkan atau menghapus pesanan
  route.delete('/:id', bookingsController.deleteBooking);
};
