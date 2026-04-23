const { Chats } = require('../../../models');

async function sendMessage(ride_id, sender, message) {
  return Chats.create({
    ride_id,
    sender,
    message,
    created_at: new Date(),
  });
}

async function getMessages(ride_id) {
  return Chats.find({ ride_id }).sort({ created_at: 1 });
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