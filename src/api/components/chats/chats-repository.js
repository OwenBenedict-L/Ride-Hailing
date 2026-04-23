const { Chats } = require('../../../models');

async function sendMessage(rideId, sender, message) {
  return Chats.create({
    rideId,
    sender,
    message,
    created_at: new Date(),
  });
}

async function getMessages(rideId) {
  return Chats.find({ rideId }).sort({ created_at: 1 });
}

async function editMessage(id, message) {
  return Chats.findByIdAndUpdate(
    id,
    { message, updated_at: new Date() },
    { new: true }
  );
}

async function deleteMessage(id) {
  return Chats.findByIdAndDelete(id);
}

module.exports = {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
};