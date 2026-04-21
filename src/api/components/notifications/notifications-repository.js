const { Notifications } = require('../../../models');

async function getNotifications(userId) {
  return Notifications.find({ userId }).sort({ createdAt: -1 });
}

async function createNotification(userId, title, message, type) {
  return Notifications.create({
    userId,
    title,
    message,
    type,
  });
}

async function markAsRead(id) {
  return Notifications.updateOne({ _id: id }, { $set: { isRead: true } });
}

async function clearNotifications(userId) {
  return Notifications.deleteMany({ userId });
}

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  clearNotifications,
};
