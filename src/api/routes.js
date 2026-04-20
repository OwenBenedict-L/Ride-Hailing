const express = require('express');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const helpcenter = require('./components/helpcenter/tickets-route'); 

module.exports = () => {
  const app = express.Router();

  app.use('/books', books);
  app.use('/users', users);
  app.use('/helpcenter/tickets', helpcenter); 

  return app;
};