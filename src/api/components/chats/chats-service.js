const chatRepository = require('./chats-repository');

async function sendMessage(rideId, sender, message) {
  return chatRepository.sendMessage(rideId, sender, message);
}

async function getMessages(rideId) {
  return chatRepository.getMessages(rideId);
}

async function editMessage(id, message) {
  return chatRepository.editMessage(id, message);
}

async function deleteMessage(id) {
  return chatRepository.deleteMessage(id);
}

module.exports = {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
};