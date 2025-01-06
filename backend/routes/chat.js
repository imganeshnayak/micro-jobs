// import express from 'express';
// import Chat from '../models/Chat.js'; // Ensure this model exists
// import Notification from '../models/Notification.js'; // Import Notification model
// import { io } from '../server.js'; // Ensure you import io from your server file
// import ChatRoom from '../models/chatRoom.js';
// import Message from '../models/message.js';

// const router = express.Router();

// // Send a message
// // router.post('/send', async (req, res) => {
// //   const { senderId, receiverId, message } = req.body;

// //   try {
// //     const chatMessage = new Chat({ senderId, receiverId, message });
// //     await chatMessage.save();
    
// //     // Create a notification
// //     const notification = new Notification({
// //       userId: receiverId,
// //       message: `New message from ${senderId}: ${message}`,
// //       jobId: chatMessage._id, // Assuming you want to link it to the job
// //       chatRoomId,
// //     });
// //     await notification.save(); // Save the notification

// //     // Emit notification to the receiver
// //     io.to(receiverId).emit('message', chatMessage);
    
// //     res.status(200).json(chatMessage);
// //   } catch (error) {
// //     console.error('Error sending message:', error);
// //     res.status(500).json({ message: 'Error sending message', error: error.message });
// //   }
// // });
// router.post('/send', async (req, res) => {
//   const { senderId, receiverId, message, chatRoomId } = req.body; // Include chatRoomId in the destructure

//   if (!senderId || !receiverId || !message || !chatRoomId) {
//     return res.status(400).json({ message: 'All fields are required: senderId, receiverId, message, and chatRoomId.' });
//   }

//   try {
//     // Save the chat message
//     const chatMessage = new Chat({ senderId, receiverId, message });
//     await chatMessage.save();

//     // Create and save a notification
//     const notification = new Notification({
//       userId: receiverId,
//       message: `New message from ${senderId}: ${message}`,
//       jobId: chatMessage._id, // Link the notification to the job/message ID
//       chatRoomId, // Use the chatRoomId from the request body
//     });
//     await notification.save();

//     // Emit the message to the receiver in real-time
//     io.to(receiverId).emit('message', chatMessage);

//     res.status(200).json(chatMessage);
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ message: 'Error sending message', error: error.message });
//   }
// });



// router.post('/rooms', async (req, res) => {
//   try {
//     const { senderId, receiverId, jobId } = req.body;
    
//     // Check if chat room already exists
//     const existingRoom = await ChatRoom.findOne({
//       participants: { $all: [senderId, receiverId] },
//       jobId
//     });

//     if (existingRoom) {
//       return res.json({ chatRoomId: existingRoom._id });
//     }

//     // Create new chat room
//     const newRoom = new ChatRoom({
//       participants: [senderId, receiverId],
//       jobId,
//       createdAt: new Date()
//     });

//     await newRoom.save();
//     res.status(201).json({ chatRoomId: newRoom._id });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating chat room', error });
//   }
// });

// // Get messages for a chat room
// router.get('/:chatRoomId/messages', async (req, res) => {
//   try {
//     const messages = await Message.find({ chatRoomId: req.params.chatRoomId })
//       .sort({ timestamp: 1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching messages', error });
//   }
// });

// // Send a message
// router.post('/:chatRoomId/messages', async (req, res) => {
//   try {
//     const { senderId, content } = req.body;
//     const newMessage = new Message({
//       chatRoomId: req.params.chatRoomId,
//       senderId,
//       content,
//       timestamp: new Date()
//     });

//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ message: 'Error sending message', error });
//   }
// });

// // Get messages for a chat room
// router.get('/:chatRoomId/messages', async (req, res) => {
//   try {
//     const messages = await Message.find({ chatRoomId: req.params.chatRoomId }).sort({ timestamp: 1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching messages', error });
//   }
// });



// export default router; 


import express from 'express';
import Chat from '../models/Chat.js';
import Notification from '../models/Notification.js';
import { io } from '../server.js';
import ChatRoom from '../models/chatRoom.js';
import Message from '../models/message.js';

const router = express.Router();

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

// Get messages for a chat room
// router.get('/:chatRoomId/messages', async (req, res) => {
//   const { senderId, receiverId, message } = req.body;
//   const { chatRoomId } = req.params; // Get chatRoomId from the request parameters

//   try {
//     const messages = await Message.find({ chatRoomId: req.params.chatRoomId }).sort({ timestamp: 1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching messages', error });
//   }
// });

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

// router.get('/:chatRoomId/messages', async (req, res) => {
//   const { chatRoomId } = req.params; // Retrieve chatRoomId from the URL
//   try {
//     // Fetch all messages for the specified chat room, sorted by timestamp
//     const messages = await Message.find({ chatRoomId }).sort({ timestamp: 1 });
//     if (!messages.length) {
//       return res.status(404).json({ message: 'No messages found for this chat room.' });
//     }
//     res.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ message: 'Error fetching messages', error: error.message });
//   }
// });
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


export default router;