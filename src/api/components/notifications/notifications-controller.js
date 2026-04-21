const notificationsService = require('./notifications-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getNotifications(request, response, next) {
  try {
    const { userId } = request.query;

    if (!userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR, 
        'User ID is required!'
        );
    }

    const notifications = await notificationsService.getNotifications(userId);

    return response
        .status(200)
        .json(notifications);
  } catch (error) {
    return next(error);
  }
}

async function createNotification(request, response, next) {
  try {
    const { userId, title, message, type } = request.body;

    if (!userId || !title || !message) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'User ID, title, and message are required!'
      );
    }

    const success = await notificationsService.createNotification(
      userId,
      title,
      message,
      type
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create notification.'
      );
    }

    return response.status(201).json({ message: 'Notification sent successfully!' });
  } catch (error) {
    return next(error);
  }
}

async function clearNotifications(request, response, next) {
  try {
    const { userId } = request.body;

    if (!userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR, 
        'User ID is required!'
        );
    }

    const success = await notificationsService.clearNotifications(userId);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to clear notifications.'
      );
    }

    return response
        .status(200)
        .json({ message: 'Notifications cleared successfully!' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getNotifications,
  createNotification,
  clearNotifications,
};
