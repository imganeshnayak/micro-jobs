
import express from 'express';
import Chat from '../models/Chat.js';
import Notification from '../models/Notification.js';
import { io } from '../server.js';
import ChatRoom from '../models/chatRoom.js';

const router = express.Router();

router.get('/:chatRoomId', async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    const chatRoom = await ChatRoom.findById(chatRoomId).populate('participants');
    
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Assuming participants are stored as an array in chatRoom, with user references
    const senderId = chatRoom.participants[0]._id; // Sender
    const receiverId = chatRoom.participants[1]._id; // Receiver

    res.json({ senderId, receiverId });
  } catch (error) {
    console.error('Error fetching chat room:', error);
    res.status(500).json({ message: 'Error fetching chat room', error });
  }
});



// Create or get a chat room
router.post('/rooms', async (req, res) => {
  const { senderId, receiverId, jobId } = req.body;

  try {
    const existingRoom = await ChatRoom.findOne({
      participants: { $all: [senderId, receiverId] },
      jobId
    });

    if (existingRoom) {
      return res.json({ chatRoomId: existingRoom._id });
    }

    const newRoom = new ChatRoom({
      participants: [senderId, receiverId],
      jobId,
      createdAt: new Date()
    });

    await newRoom.save();
    res.status(201).json({ chatRoomId: newRoom._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat room', error });
  }
});

// // Send a message
router.post('/send', async (req, res) => {
  const { senderId, receiverId, message, chatRoomId } = req.body;

  if (!senderId || !receiverId || !message || !chatRoomId) {
    return res.status(400).json({ message: 'All fields are required: senderId, receiverId, message, and chatRoomId.' });
  }

  try {
    const chatMessage = new Chat({ senderId, receiverId, message, chatRoomId });
    await chatMessage.save();

    const notification = new Notification({
      userId: receiverId,
      message: `New message from ${senderId}: ${message}`,
      jobId: chatMessage._id,
      chatRoomId,
    });
    await notification.save();

    io.to(receiverId).emit('message', chatMessage);
    res.status(200).json(chatMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});
router.post('/send', async (req, res) => {
  const { senderId, receiverId, message, chatRoomId } = req.body;

  // Check if all fields are provided
  if (!senderId || !receiverId || !message || !chatRoomId) {
    return res.status(400).json({ message: 'All fields are required: senderId, receiverId, message, and chatRoomId.' });
  }

  try {
    // Save the chat message
    const chatMessage = new Chat({
      senderId,
      receiverId,
      message,
      chatRoomId,
      timestamp: new Date(),
    });
    await chatMessage.save();

    res.status(201).json(chatMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});


// Send a message
router.post('/:chatRoomId/messages', async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const { chatRoomId } = req.params; // Get chatRoomId from the request parameters

  if (!senderId || !receiverId || !message || !chatRoomId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const chatMessage = new Chat({ senderId, receiverId, message, chatRoomId });
    await chatMessage.save();

    // Additional logic for notifications can go here

    res.status(200).json(chatMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error });
  }
});


router.get('/:chatRoomId/messages', async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    // Fetch all messages for the specified chat room, sorted by timestamp
    const messages = await Chat.find({ chatRoomId }).sort({ timestamp: 1 });
    if (!messages.length) {
      return res.status(404).json({ message: 'No messages found for this chat room.' });
    }
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});


router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({ participants: userId }).populate('participants');
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Error fetching chats' });
  }
});
router.get('/rooms/:chatRoomId', async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    const chatRoom = await ChatRoom.findById(chatRoomId).populate('participants');
    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    res.json(chatRoom);
  } catch (error) {
    console.error('Error fetching chat room:', error);
    res.status(500).json({ message: 'Error fetching chat room', error });
  }
});





// Fetch all chat rooms for a particular user
router.get('/user/:userId/rooms', async (req, res) => {
  const { userId } = req.params;

  try {
    const chatRooms = await ChatRoom.find({
      participants: userId,
    })
      .populate('participants') // Populate participant details (optional)
      .sort({ createdAt: -1 }); // Sort by most recent

    if (!chatRooms.length) {
      return res.status(404).json({ message: 'No chat rooms found for this user.' });
    }

    res.status(200).json(chatRooms);
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    res.status(500).json({ message: 'Error fetching chat rooms', error: error.message });
  }
});



export default router;