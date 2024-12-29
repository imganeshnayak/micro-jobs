// JobDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';

const JobDetail = () => {
  const { jobId } = useParams();  // Get jobId from URL params
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading)
    return (
      <div className="loading-spinner d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="error-message text-center text-danger mt-5">
        <h2>{error}</h2>
      </div>
    );

  return (
    <div>
      <Navbar />
      <BreadCrumbs title="Job Details" />
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>State:</strong> {job.state}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Posted By:</strong> {job.posterName}</p>
            <p><strong>Email:</strong> {job.email}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
