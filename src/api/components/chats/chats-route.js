const express = require('express');
const chatController = require('./chats-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/chats', route);

  // Mengirimkan message sesuai dengan role-nya (Driver/User)
  route.post('/send', chatController.sendMessage);

  // Melihat seluruh log chats
  route.get('/messages/:rideId', chatController.getMessages);

  // Mengedit message yang sudah dikirim sebelumnya
  route.put('/edit', chatController.editMessage);

  // Menghapus message
  route.delete('/messages/:id', chatController.deleteMessage);
};
