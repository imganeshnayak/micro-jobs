import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/, // Ensure it's a 6-digit pincode
  },
  posterName: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Email validation regex
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-Time', 'Part-Time', 'Freelance', 'Internship', 'Contract'] // Enumerate job types
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Job', jobSchema);