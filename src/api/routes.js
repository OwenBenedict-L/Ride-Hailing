const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const estimations = require('./components/estimations/estimations-route');
const wallet = require('./components/wallet/wallet-route');
const review = require('./components/review/review-route');
const bookings = require('./components/bookings/bookings-route');
const notifications = require('./components/notifications/notifications-route');

module.exports = () => {
  const app = express.Router();
  estimations(app);
  books(app);
  users(app);
  wallet(app);
  review(app);
  bookings(app);
  notifications(app);

  return app;
};
