const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const bookings = require('./components/bookings/bookings-route');
const notifications = require('./components/notifications/notifications-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  bookings(app);
  notifications(app);

  return app;
};
