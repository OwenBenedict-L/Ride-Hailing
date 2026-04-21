const notificationsRepository = require('./notifications-repository');

async function getNotifications(userId) {
  return notificationsRepository.getNotifications(userId);
}

async function createNotification(userId, title, message, type) {
  return notificationsRepository.createNotification(
    userId,
    title,
    message,
    type
  );
}

async function clearNotifications(userId) {
  return notificationsRepository.clearNotifications(userId);
}

module.exports = {
  getNotifications,
  createNotification,
  clearNotifications,
};
