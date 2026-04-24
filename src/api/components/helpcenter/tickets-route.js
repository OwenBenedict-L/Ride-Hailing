const express = require('express');
const ticketsController = require('./tickets-controller');
const router = express.Router({ mergeParams: true });

module.exports = (app) => {
  app.use('/helpcenter/tickets', router);
  
  router.post('/', ticketsController.createTicket);
  router.post('/:id/replies', ticketsController.addReply);
  router.get('/', ticketsController.getTickets);
  router.get('/:id', ticketsController.getTicketById); 
  router.put('/:id/resolve', ticketsController.resolveTicket);
};
