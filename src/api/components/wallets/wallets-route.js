const express = require('express');

const walletsController = require('./wallets-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/wallets', route);

  // Get wallet balance
  route.get('/balance/:id', walletsController.getBalance);

  // Top up wallet balance
  route.post('/top-up', walletsController.topUpBalance);

  // Get history
  route.get('/history/:userId', walletsController.getHistory);
};
