const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const drivers = require('./components/drivers/drivers-route');
const chats = require('./components/chats/chats-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  drivers(app);
  chats(app);

  return app;
};
