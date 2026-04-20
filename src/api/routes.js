const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const estimations = require('./components/estimations/estimations-route');

module.exports = () => {
  const app = express.Router();
  estimations(app);
  books(app);
  users(app);

  return app;
};
