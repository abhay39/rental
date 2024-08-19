// route/messageRoutes.js
import express from 'express';
import Message from '../models/messageModel.js';

const router = express.Router();

const messageRoutes = (io) => {
  // Send a message
  router.post('/', async (req, res) => {
    const { content, sender, recipient, chatRoom } = req.body;

    try {
      const message = new Message({
        content,
        sender,
        recipient,
        chatRoom,
      });

      await message.save();

      // Emit the new message to connected clients via Socket.IO
      io.emit('chat message', message);

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get messages by chatRoom
  router.get('/:chatRoom', async (req, res) => {
    const { chatRoom } = req.params;

    try {
      const messages = await Message.find({ chatRoom }).sort({ timestamp: 1 });
      res.status(200).json({
        "messages":messages,
        "chatRoom": chatRoom
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get direct messages between two users
  router.get('/direct/:sender/:recipient', async (req, res) => {
    const { sender, recipient } = req.params;

    try {
      const messages = await Message.find({
        $or: [
          { sender, recipient },
          { sender: recipient, recipient: sender }
        ]
      }).sort({ timestamp: 1 });

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

export default messageRoutes;
