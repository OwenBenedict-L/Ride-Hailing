const express = require('express');

const auth = require('./components/auth/auth-route');
const promos = require('./components/promos/promos-route');
const users = require('./components/users/users-route');
const wallets = require('./components/wallets/wallets-route');
const reviews = require('./components/reviews/reviews-route');
const bookings = require('./components/bookings/bookings-route');
const notifications = require('./components/notifications/notifications-route');
const estimations = require('./components/estimations/estimations-route');
const drivers = require('./components/drivers/drivers-route');
const chats = require('./components/chats/chats-route');
const helpcenter = require('./components/helpcenter/tickets-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  promos(app);
  users(app);
  wallets(app);
  reviews(app);
  bookings(app);
  notifications(app);
  estimations(app);
  drivers(app);
  chats(app);
  helpcenter(app);

  return app;
};
