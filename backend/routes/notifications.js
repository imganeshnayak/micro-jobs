import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// Accept a notification and redirect to chat room
router.post('/accept/:notificationId', async (req, res) => {
  const { notificationId } = req.params;

  try {
    // Find the notification by ID
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Respond with the chatRoomId
    res.status(200).json({
      message: 'Notification accepted',
      chatRoomId: notification.chatRoomId, // Send the chatRoomId to the frontend
    });
  } catch (error) {
    console.error('Error accepting notification:', error);
    res.status(500).json({ message: 'Error accepting notification', error: error.message });
  }
});

// Get notifications for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Find and delete the notification
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
});

// Fetch chat messages for a chat room
router.get('/:chatRoomId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ chatRoomId: req.params.chatRoomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// Create a new notification
router.post('/', async (req, res) => {
  const { receiverId, senderId, message, chatRoomId } = req.body; // Extract fields from request body

  try {
    if (!receiverId || !senderId || !message || !chatRoomId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const notification = new Notification({
      userId: receiverId,
      message,
      senderId,
      chatRoomId,
      receiverId,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
});

export default router;
