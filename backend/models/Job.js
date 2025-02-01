import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9\s,.'-]{3,}$/ // Ensure it's at least 3 characters long
  },
  salary: {
    type: String,
    required: true,
    trim: true
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
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Job', jobSchema);