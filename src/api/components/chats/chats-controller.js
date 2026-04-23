const chatService = require('./chats-service');
const Bookings = require('../../../models');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function sendMessage(req, res, next) {
  try {
    const { ride_id, sender_id, message } = req.body;

    if (!ride_id || !sender_id || !message) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'All fields required'
      );
    }

    const booking = await Bookings.findById(ride_id);

    if (!booking) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Booking not found');
    }
    let sender;

    if (sender_id === booking.userId.toString()) {
      sender = 'user';
    } 
    else if
      (booking.driverId && sender_id === booking.driverId.toString()) {
      sender = 'driver';
    } 
    else {
      throw errorResponder(
        errorTypes.UNAUTHORIZED,
        'Error!'
      );
    }

    const result = await chatService.sendMessage({
      ride_id,
      sender,
      message,
    });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

async function getMessages(req, res, next) {
  try {
    const { ride_id } = req.params;

    const messages = await chatService.getMessages(ride_id);

    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
}

async function editMessage(req, res, next) {
  try {
    const { id, message } = req.body;

    if (!id || !message) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'ID and message required'
      );
    }

    const result = await chatService.editMessage(id, message);

    if (!result) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Message not found');
    }

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

async function deleteMessage(req, res, next) {
  try {
    const { id } = req.params;

    const result = await chatService.deleteMessage(id);

    if (!result) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Message not found');
    }

    return res.status(200).json({
      message: 'Message deleted',
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
};
