// routes/jobs.js
import express from 'express';
import Job from '../models/Job.js';
import Notification from '../models/Notification.js';

const router = express.Router();



// Create a new job
router.post('/', async (req, res) => {
  console.log(req.body); 
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json({ 
      message: 'Job posted successfully',
      job: savedJob 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error posting job',
      error: error.message 
    });
  }
});
// routes/jobs.js

// Get all jobs posted by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//


router.get('/user/:userId', async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.params.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching jobs',
      error: error.message 
    });
  }
});

// Get a specific job
router.get('/jobs/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching job',
      error: error.message,
    });
  }
});

// routes/jobRoutes.js
// router.get('/jobs/:id', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id)
//                         .select('title description company location salary pincode posterName state category email jobType userId');
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }
//     res.json(job);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// Update a job
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ 
      message: 'Job updated successfully',
      job: updatedJob 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating job',
      error: error.message 
    });
  }
});
// Send message notification to job poster
router.post('/sendNotification', async (req, res) => {
  const { recipientId, message } = req.body;

  try {
    // Emit notification to the specific user
    io.to(recipientId).emit('notification', { message });

    res.status(200).json({ success: true, message: 'Notification sent successfully.' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification.' });
  }
});

router.post('/accept-message', async (req, res) => {
  try {
    const { notificationId } = req.body;

    // Find the notification
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).send('Notification not found');

    // Mark the notification as seen
    notification.seen = true;
    await notification.save();

    // Create a chat message (the job poster accepts the message request)
    const chat = new chat({
      jobId: notification.jobId,
      senderId: notification.userId, // The user who clicked "Message"
      receiverId: notification.userId, // The job poster is the receiver
      message: 'Hello, I am interested in your job posting!',
    });

    await chat.save();

    res.status(200).send({ message: 'Message accepted and chat started' });
  } catch (error) {
    console.error('Error accepting message:', error);
    res.status(500).send('Internal Server Error');
  }
});




// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ 
      message: 'Job deleted successfully',
      job: deletedJob 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting job',
      error: error.message 
    });
  }
});

export default router;