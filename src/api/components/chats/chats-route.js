const express = require('express');
const chatController = require('./chats-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/chat', route);

  route.post('/send', chatController.sendMessage);
  route.get('/messages/:ride_id', chatController.getMessages);
  route.put('/edit', chatController.editMessage);
  route.delete('/messages/:id', chatController.deleteMessage);
};
