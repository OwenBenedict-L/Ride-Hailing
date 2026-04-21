const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const wallet = require('./components/wallet/wallet-route');
const review = require('./components/review/review-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  wallet(app);
  review(app);

  return app;
};
