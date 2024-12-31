import React, { useState } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("jobType");
  const [pinCode, setPinCode] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams();
      if (title) query.append("title", title);
      if (jobType !== "jobType") query.append("jobType", jobType);
      if (pinCode) query.append("pinCode", pinCode);

      const response = await fetch(
        `http://localhost:5000/search/search?${query.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const jobs = await response.json();
      setFilteredJobs(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("An error occurred while fetching jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchJobs();
  };

  const handleViewDetails = (jobId) => {
    navigate(`/job-details/${jobId}`); // Navigate to the JobDetail page
  };

  return (
    <div>
      {/* Search Section */}
      <div
        className="container-fluid bg-primary mb-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{ padding: "40px" }}
      >
        <div className="container">
          <div className="row g-2">
            <div className="col-md-10">
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select border-0"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="jobType" disabled>
                      Job Type
                    </option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Enter PIN Code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-dark border-0 w-100"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Search Results */}
      <div className="container">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : filteredJobs.length > 0 ? (
          <div className="row g-3">
            {filteredJobs.map((job) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={job._id}>
                <div className="small-job-card shadow-sm rounded p-3">
                  <h5 className="text-primary">{job.title}</h5>
                  <p className="mb-1">
                    <FaMapMarkerAlt className="me-1 text-secondary" />
                    {job.location}
                  </p>
                  <p className="mb-1">
                    <FaBriefcase className="me-1 text-secondary" />
                    {job.jobType}
                  </p>
                  <p className="mb-1">
                    <FaDollarSign className="me-1 text-secondary" />
                    {job.salary}
                  </p>
                  <button
                    className="btn btn-outline-primary btn-sm mt-2 w-100"
                    onClick={() => handleViewDetails(job._id)} // Navigate on click
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
