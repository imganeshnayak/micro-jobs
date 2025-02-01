import express from 'express';
import Service from '../models/Service.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// Create a new service
router.post('/', async (req, res) => {
  console.log('Received data:', req.body); // Debug incoming data

  try {
    // Map request body to match schema
    const formattedData = {
      userId: req.body.userId,
      providerName: req.body.providerName,
      email: req.body.email,
      phone: req.body.phone || 'N/A',
      serviceCategory: req.body.serviceCategory,
      description: req.body.description || 'N/A',
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      experience: req.body.experience || 'Not provided',
      rate: req.body.rate || 'Not provided',
      availability: req.body.availability || 'Full-Time'
    };

    const newService = new Service(formattedData);
    const savedService = await newService.save();

    res.status(201).json({
      message: 'Service posted successfully',
      service: savedService
    });
  } catch (error) {
    console.error('Error saving service:', error.message);
    res.status(500).json({
      message: 'Error saving service',
      error: error.message
    });
  }
});


// Get all services posted by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const services = await Service.find({ userId: req.params.userId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user services', 
      error: error.message 
    });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching services',
      error: error.message 
    });
  }
});

// Get a specific service
router.get('/:serviceId', async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching service',
      error: error.message 
    });
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ 
      message: 'Service updated successfully',
      service: updatedService 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating service',
      error: error.message 
    });
  }
});

// Send message notification to service poster
router.post('/sendNotification', async (req, res) => {
  const { recipientId, message } = req.body;

  try {
    // Emit notification to the specific user
    io.to(recipientId).emit('notification', { message });

    res.status(200).json({ 
      success: true, 
      message: 'Notification sent successfully.' 
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send notification.' 
    });
  }
});

// Accept a message request
router.post('/accept-message', async (req, res) => {
  try {
    const { notificationId } = req.body;

    // Find the notification
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).send('Notification not found');

    // Mark the notification as seen
    notification.seen = true;
    await notification.save();

    // Create a chat message (the service poster accepts the message request)
    const chat = new Chat({
      serviceId: notification.serviceId,
      senderId: notification.userId, // The user who clicked "Message"
      receiverId: notification.servicePosterId, // The service poster is the receiver
      message: 'Hello, I am interested in your service!',
    });

    await chat.save();

    res.status(200).send({ 
      message: 'Message accepted and chat started' 
    });
  } catch (error) {
    console.error('Error accepting message:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ 
      message: 'Service deleted successfully',
      service: deletedService 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting service',
      error: error.message 
    });
  }
});

export default router;
