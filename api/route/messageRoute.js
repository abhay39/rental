// route/messageRoutes.js
import express from 'express';
import Message from '../models/messageModel.js';
import mongoose from 'mongoose';

const router = express.Router();


const getUserChatList = async (userId) => {
  try {
    // Convert userId to ObjectId if it's not already
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Query the messages collection to find users the given user has talked with
    const chatList = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userObjectId },
            { recipient: userObjectId }
          ]
        }
      },
      {
        $group: {
          _id: null,
          users: {
            $addToSet: {
              $cond: [
                { $eq: ["$sender", userObjectId] },
                "$recipient",
                "$sender"
              ]
            }
          }
        }
      },
      {
        $unwind: "$users"
      },
      {
        $lookup: {
          from: 'users', // The collection name for users
          localField: 'users',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          'userDetails.password': 0,   // Exclude password
          'userDetails.email': 0,      // Exclude email
          'userDetails.contactNumber': 0,  // Exclude contact number
        }
      }
    ]);

    // Extract the list of user details from the result
    const users = chatList.map(item => item.userDetails);

    return users;
  } catch (error) {
    console.error('Error retrieving user chat list:', error);
    return [];
  }
};


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

  router.get('/user/:userId/chat-list', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const users = await getUserChatList(userId);
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving chat list' });
    }
  });

  return router;
};

export default messageRoutes;
