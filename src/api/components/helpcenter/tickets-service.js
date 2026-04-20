const ticketsRepository = require('./tickets-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createTicket(data) {
  return await ticketsRepository.create(data);
}

async function addReply(id, replyData) {
  const ticket = await ticketsRepository.findById(id);

  if (!ticket) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found');
  }

  if (ticket.status === 'resolved') {
    throw errorResponder(errorTypes.VALIDATION_ERROR, 'Cannot reply to a resolved ticket');
  }

  ticket.replies.push(replyData);
  return await ticketsRepository.saveTicket(ticket);
}

async function getTickets(userId) {
  return await ticketsRepository.findByUserId(userId);
}

async function getTicketById(id) {
  return await ticketsRepository.findById(id);
}

async function resolveTicket(id) {
  const ticket = await ticketsRepository.updateById(id, { status: 'resolved' });

  if (!ticket) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found');
  }

  return ticket;
}

module.exports = {
  createTicket,
  addReply,
  getTickets,
  getTicketById,
  resolveTicket,
};
