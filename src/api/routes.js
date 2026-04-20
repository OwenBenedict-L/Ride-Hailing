const express = require('express');

const auth = require('./components/auth/auth-route');
const promos = require('./components/promos/promos-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  books(app);
  promos(app);
  users(app);

  return app;
};
