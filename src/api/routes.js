const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const wallet = require('./components/wallet/wallet-route');
const review = require('./components/review/review-route');
const bookings = require('./components/bookings/bookings-route');
const notifications = require('./components/notifications/notifications-route');
const estimations = require('./components/estimations/estimations-route');

module.exports = () => {
  const app = express.Router();
  books(app);
  users(app);
  wallet(app);
  review(app);
  bookings(app);
  notifications(app);
  estimations(app);

  return app;
};
