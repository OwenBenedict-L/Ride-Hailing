const chatRepository = require('./chats-repository');

async function sendMessage(ride_id, sender, message) {
  return chatRepository.sendMessage(ride_id, sender, message);
}

async function getMessages(ride_id) {
  return chatRepository.getMessages(ride_id);
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