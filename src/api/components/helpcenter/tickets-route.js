const express = require('express');
const ticketsController = require('./tickets-controller');
const router = express.Router({ mergeParams: true });

module.exports = (app) => {
  app.use('/helpcenter/tickets', router);
  router.get('/', ticketsController.getTickets);
  router.post('/', ticketsController.createTicket);
  router.get('/:id', ticketsController.getTicketById);
  router.post('/:id/replies', ticketsController.addReply); 
  router.put('/:id/resolve', ticketsController.resolveTicket);
};
