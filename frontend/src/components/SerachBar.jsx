import React, { useState } from "react";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Category");
  const [location, setLocation] = useState("Location");
  const [filteredJobs, setFilteredJobs] = useState([]);



  
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      location: "New York, USA",
      type: "Full Time",
      salary: "$75,000 - $95,000",
      companyLogo: "assets/img/com-logo-1.jpg",
      companyName: "Tech Corp",
      featured: true,
      description: "We are looking for an experienced software engineer.",
      postedDate: "01 Jan, 2024",
    },
    {
      id: 2,
      title: "Marketing Manager",
      location: "London, UK",
      type: "Full Time",
      salary: "$65,000 - $85,000",
      companyLogo: "assets/img/com-logo-2.jpg",
      companyName: "Global Marketing",
      featured: true,
      description: "Join our dynamic marketing team.",
      postedDate: "02 Jan, 2024",
    },
    {
      id: 3,
      title: "Content Writer",
      location: "Remote",
      type: "Part Time",
      salary: "$30,000 - $45,000",
      companyLogo: "assets/img/com-logo-3.jpg",
      companyName: "Content Hub",
      featured: false,
      description: "Create engaging content for our platforms.",
      postedDate: "03 Jan, 2024",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      location: "San Francisco, USA",
      type: "Full Time",
      salary: "$80,000 - $100,000",
      companyLogo: "assets/img/com-logo-4.jpg",
      companyName: "Design Studio",
      featured: true,
      description: "Design beautiful and functional interfaces.",
      postedDate: "04 Jan, 2024",
    },
    {
      id: 5,
      title: "Data Analyst",
      location: "Berlin, Germany",
      type: "Part Time",
      salary: "$40,000 - $60,000",
      companyLogo: "assets/img/com-logo-5.jpg",
      companyName: "Data Insights",
      featured: false,
      description: "Analyze and interpret complex data sets.",
      postedDate: "05 Jan, 2024",
    },
  ];

  const handleSearch = () => {
    const results = jobs.filter((job) => {
      const matchesKeyword =
        keyword === "" ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory =
        category === "Category" || job.type === category;
      const matchesLocation =
        location === "Location" || job.location === location;

      return matchesKeyword && matchesCategory && matchesLocation;
    });

    setFilteredJobs(results);
  };

  return (
    <div>
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
                    placeholder="Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select border-0"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Category" disabled>
                      Category
                    </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select border-0"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="Location" disabled>
                      Location
                    </option>
                    <option value="New York, USA">New York, USA</option>
                    <option value="London, UK">London, UK</option>
                    <option value="Remote">Remote</option>
                    <option value="San Francisco, USA">
                      San Francisco, USA
                    </option>
                    <option value="Berlin, Germany">Berlin, Germany</option>
                  </select>
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
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="card mb-3">
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
                      <strong>Type:</strong> {job.type}
                    </p>
                    <p className="card-text">
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p className="card-text">{job.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Posted on {job.postedDate}
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
