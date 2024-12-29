import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// routes/jobs.js
// routes/jobs.js
router.get('/search', async (req, res) => {
    try {
      const { title, jobType, pinCode } = req.query;
  
      // Build the filter object
      let filter = {};
      if (title) filter.title = new RegExp(title, 'i');  // Case-insensitive search for title
      if (jobType && jobType !== "jobType") filter.jobType = jobType;
      if (pinCode) filter.pincode = pinCode;
  
      // Query the database based on the filter object
      const jobs = await Job.find(filter).sort({ createdAt: -1 });  // Sort by newest first
      res.json(jobs);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching jobs',
        error: error.message,
      });
    }
  });
  
  

export default router;