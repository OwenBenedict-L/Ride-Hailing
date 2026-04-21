const chatService = require('./chat-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function sendMessage(req, res, next) {
  try {
    const { ride_id, sender, message } = req.body;

    if (!ride_id || !sender || !message) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'All fields required');
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
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'ID and message required');
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