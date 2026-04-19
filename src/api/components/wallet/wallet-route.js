const express = require('express');

const walletController = require('./wallet-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/wallet', route);

  // Get wallet balance
  route.get('/balance/:id', walletController.getBalance);

  // Top up wallet balance
  route.post('/top-up', walletController.topUpBalance);

  // Pay for a ride
  route.post('/payment', walletController.payForRide);
};
