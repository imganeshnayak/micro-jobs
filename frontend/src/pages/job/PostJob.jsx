import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PostJob.css'; // Optional: Add your CSS for styling

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/jobs', jobData);
      toast.success(response.data.message); // Show success toast
      // Reset the form
      setJobData({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job'); // Show error toast
    }
  };

  return (
    <div className="post-job-container">
      <h2 className="form-title">Post a Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;