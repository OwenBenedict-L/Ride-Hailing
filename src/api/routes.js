const express = require('express');
const estimations = require('./components/estimations/estimations-route');
const wallet = require('./components/wallet/wallet-route');
const review = require('./components/review/review-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const helpcenter = require('./components/helpcenter/tickets-route');

module.exports = () => {
  const app = express.Router();
  estimations(app);
  books(app);
  users(app);
  wallet(app);
  review(app);
  helpcenter(app);

  return app;
};
