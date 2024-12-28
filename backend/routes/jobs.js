// routes/jobs.js
import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// Create a new job
router.post('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching job',
      error: error.message 
    });
  }
});

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