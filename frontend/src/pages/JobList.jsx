

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState(''); // Search by job title
  const [searchLocation, setSearchLocation] = useState(''); // Search by location
  const [searchCategory, setSearchCategory] = useState(''); // Search by category
  const jobsPerPage = 10; // Show 10 jobs per page
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs`);
        setJobs(response.data);
        setFilteredJobs(response.data); // Initialize filteredJobs
      } catch (error) {
        setError('Failed to fetch jobs');
        toast.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search function
  const handleSearch = () => {
    const filtered = jobs.filter((job) => {
      const matchesTitle = job.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const matchesLocation = job.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
      const matchesCategory = job.category
        .toLowerCase()
        .includes(searchCategory.toLowerCase());

      return matchesTitle && matchesLocation && matchesCategory;
    });

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page
  };

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
    <>
      <div className="container-xxl p-0">
        <Navbar />
        <BreadCrumbs title="Available Jobs" />

        {/* Search Bar */}
        <div
          className="search-bar container-fluid py-4"
          style={{ backgroundColor: '#00B074', color: 'white' }}
        >
          <div className="container">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Title"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  style={{
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  style={{
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Category"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  style={{
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: 'white',
                    color: '#00B074',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                  }}
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
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
            {currentJobs.map((job) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={job._id}>
                <div className="job-card shadow-sm rounded p-4 h-100">
                  <h4 className="job-title mb-3 text-primary">{job.title.toUpperCase()}</h4>
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

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default JobList;