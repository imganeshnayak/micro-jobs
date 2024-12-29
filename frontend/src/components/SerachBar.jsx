import React, { useState } from "react";

function SearchBar() {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("jobType");
  const [pinCode, setPinCode] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams();
      if (title) query.append("title", title);
      if (jobType !== "jobType") query.append("jobType", jobType);
      if (pinCode) query.append("pinCode", pinCode);

      const response = await fetch(`http://localhost:5000/search/search?${query.toString()}`);
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

  return (
    <div>
      {/* Search Section */}
      <div
        className="container-fluid bg-primary mb-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{ padding: "35px" }}
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
          filteredJobs.map((job) => (
            <div key={job._id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <img
                    src={job.companyLogo}
                    className="img-fluid rounded-start"
                    alt={job.companyName}
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="card-text">
                      <strong>Type:</strong> {job.jobType}
                    </p>
                    <p className="card-text">
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p className="card-text">{job.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Posted on {new Date(job.createdAt).toLocaleDateString()}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs match your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
