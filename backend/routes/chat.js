// backend/routes/chat.js

import express from 'express';
import Chat from '../models/Chat.js';  // Import your Chat model
const router = express.Router();

// Route to send a message
router.post('/:chatId/message', async (req, res) => {
  const { chatId } = req.params;  // Get chatId from URL params
  const { sender, content } = req.body;  // Get message content and sender from the request body

  try {
    // Find the chat by ID
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Create the new message
    const newMessage = { sender, content, timestamp: new Date() };

    // Push the new message to the messages array of the chat
    chat.messages.push(newMessage);

    // Save the chat with the new message
    await chat.save();

    // Respond with the updated chat
    res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Fetch messages for the given user from the database
      const messages = await Message.find({ userId }); // Adjust this to match your schema
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
  });
});

export default router;
