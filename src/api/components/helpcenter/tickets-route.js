const express = require('express');
const router = express.Router();
const ticketsController = require('./tickets-controller');
router.get('/', ticketsController.getTickets);
router.get('/:id', ticketsController.getTicketById);
router.post('/', ticketsController.createTicket);
router.post('/:id/replies', ticketsController.addReply);
router.put('/:id/resolve', ticketsController.resolveTicket);

module.exports = router;
