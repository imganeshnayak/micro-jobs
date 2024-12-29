// JobList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';
import './JobList.css'; // Optional: Add CSS for styling

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // useNavigate for programmatic navigation

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        setJobs(response.data);
      } catch (error) {
        setError('Failed to fetch jobs');
        toast.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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

  const handleViewDetails = (jobId) => {
    navigate(`/job-details/${jobId}`); // Redirect to the JobDetail page with jobId
  };

  return (
    <>
      <div className="container-xxl p-0">
        <Navbar />
        <BreadCrumbs title="Available Jobs" />
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col text-center">
              <h1 className="display-5">Explore Job Opportunities</h1>
              <p className="text-muted">
                Discover the latest job openings that match your skills and expertise.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {jobs.map((job) => (
              <div className="col-lg-4 col-md-6" key={job._id}>
                <div className="job-card shadow-sm rounded p-4 h-100">
                  <h4 className="job-title mb-3 text-primary">{job.title}</h4>
                  <p className="job-company mb-2">
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p className="job-location mb-2">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="job-salary mb-2">
                    <strong>Salary:</strong> {job.salary}
                  </p>
                  <p className="job-description text-truncate">
                    {job.description}
                  </p>
                  <button 
                    className="btn btn-outline-primary mt-3" 
                    onClick={() => handleViewDetails(job._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default JobList;
