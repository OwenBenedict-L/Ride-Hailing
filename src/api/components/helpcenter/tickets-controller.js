const ticketsService = require('./tickets-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createTicket(request, response, next) {
  try {
    const { transactionId, subject, description, userId } = request.body;
    if (!transactionId || !subject || !description || !userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Transaction ID, subject, description, and userId are required'
      );
    }

    const ticketData = {
      transactionId,
      subject,
      description,
      userId,
    };

    const ticket = await ticketsService.createTicket(ticketData);
    return response.status(201).json(ticket);
  } catch (error) {
    return next(error);
  }
}

async function addReply(request, response, next) {
  try {
    const { id } = request.params;
    const { sender, message } = request.body;

    if (!sender || !message) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Sender and message are required'
      );
    }

    const updatedTicket = await ticketsService.addReply(id, {
      sender,
      message,
    });
    return response.status(200).json(updatedTicket);
  } catch (error) {
    return next(error);
  }
}

async function getTickets(request, response, next) {
  try {
    const { userId } = request.query;

    if (!userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'UserId is required to monitor tickets'
      );
    }

    const tickets = await ticketsService.getTickets(userId);
    return response.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
}

async function getTicketById(request, response, next) {
  try {
    const { id } = request.params;
    const ticket = await ticketsService.getTicketById(id);

    if (!ticket) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found');
    }

    return response.status(200).json(ticket);
  } catch (error) {
    return next(error);
  }
}

async function resolveTicket(request, response, next) {
  try {
    const { id } = request.params;
    const ticket = await ticketsService.resolveTicket(id);

    return response.status(200).json({
      message: 'Ticket resolved successfully',
      ticket,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTicket,
  addReply,
  getTickets,
  getTicketById,
  resolveTicket,
};
