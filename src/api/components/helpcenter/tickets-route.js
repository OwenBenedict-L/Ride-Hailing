const express = require('express');
const ticketsController = require('./tickets-controller');
const router = express.Router();

module.exports = (app) => {
  app.use('/helpcenter/tickets', router);
  router.get('/', ticketsController.getTickets);
  router.get('/:id', ticketsController.getTicketById);
  router.post('/', ticketsController.createTicket);
  router.post('/:id/replies', ticketsController.addReply);
  router.put('/:id/resolve', ticketsController.resolveTicket);
};
