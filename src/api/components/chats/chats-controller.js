const chatService = require('./chats-service');
const bookingsService = require('../bookings/bookings-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function sendMessage(req, res, next) {
  try {
    const { 
      rideId, 
      senderId, 
      message } = req.body;

    if (!rideId || !senderId || !message) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'All fields required'
      );
    }

    const booking = await bookingsService.getBooking(rideId);

    if (!booking) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Booking not found');
    }
    let sender;

    if (senderId === booking.userId.toString()) {
      sender = 'user';
    } 
    else if
      (booking.driverId && senderId === booking.driverId.toString()) {
      sender = 'driver';
    } 
    else {
      throw errorResponder(
        errorTypes.UNAUTHORIZED,
        'Error!'
      );
    }

    const result = await chatService.sendMessage(
      rideId, 
      sender, 
      message
    );

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

async function getMessages(req, res, next) {
  try {
    const { rideId } = req.params;

    const messages = await chatService.getMessages(rideId);

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
