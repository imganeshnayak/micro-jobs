
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

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams();
      if (title) query.append("title", title);
      if (jobType !== "jobType") query.append("jobType", jobType);
      if (pinCode) query.append("pinCode", pinCode);

      const response = await fetch(`${API_BASE_URL}/search/search?${query.toString()}`
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
    navigate(`/job-details/${jobId}`);
  };

  return (
    <div>
      {/* Search Section */}
      <div
        className="search-bar container-fluid py-4"
        style={{
          backgroundColor: "#00B074",
          color: "white",
        }}
      >
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "none",
                }}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                <option value="jobType" disabled>
                  Select Job Type
                </option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter PIN Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "none",
                }}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn w-100"
                style={{
                  backgroundColor: "white",
                  color: "#00B074",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Search Results */}
      <div className="container my-5">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : filteredJobs.length > 0 ? (
          <div className="row g-4">
            {filteredJobs.map((job) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={job._id}>
                <div className="small-job-card shadow-sm rounded p-3">
                  <h5 style={{ color: "#00B074" }}>{job.title}</h5>
                  <p className="mb-1">
                    <FaMapMarkerAlt
                      className="me-1"
                      style={{ color: "#888" }}
                    />
                    {job.location}
                  </p>
                  <p className="mb-1">
                    <FaBriefcase
                      className="me-1"
                      style={{ color: "#888" }}
                    />
                    {job.jobType}
                  </p>
                  <p className="mb-1">
                    <FaDollarSign
                      className="me-1"
                      style={{ color: "#888" }}
                    />
                    {job.salary}
                  </p>
                  <button
                    className="btn btn-sm mt-2 w-100"
                    style={{
                      border: `1px solid #00B074`,
                      backgroundColor: "white",
                      color: "#00B074",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleViewDetails(job._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
