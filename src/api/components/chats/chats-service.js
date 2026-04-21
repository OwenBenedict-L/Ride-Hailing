const chatRepository = require('./chat-repository');

async function sendMessage(data) {
  return chatRepository.sendMessage(data);
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