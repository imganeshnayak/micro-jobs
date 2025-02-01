
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";

const DisplayService = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const servicesPerPage = 10; // Show 10 services per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data);
        setFilteredServices(response.data); // Initialize filteredServices
      } catch (error) {
        setError("Failed to fetch services");
        toast.error("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleViewDetails = (serviceId) => {
    navigate(`/service-details/${serviceId}`);
  };

  // Pagination logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    const filtered = services.filter((service) => {
      const matchesTitle = service.providerName
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const matchesCategory = service.serviceCategory
        .toLowerCase()
        .includes(searchCategory.toLowerCase());
      const matchesLocation =
        service.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
        service.state.toLowerCase().includes(searchLocation.toLowerCase());

      return matchesTitle && matchesCategory && matchesLocation;
    });

    setFilteredServices(filtered);
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
        <BreadCrumbs title="Available Services" />

        {/* Search Bar */}
        <div
          className="search-bar container-fluid py-4"
          style={{ backgroundColor: "#00B074", color: "white" }}
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
                    padding: "10px 15px",
                    borderRadius: "5px",
                    border: "none",
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
                    padding: "10px 15px",
                    borderRadius: "5px",
                    border: "none",
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

        {/* Services List */}
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col text-center">
              <h1 className="display-5">Explore Service Opportunities</h1>
              <p className="text-muted">
                Discover the latest service offerings that match your needs.
              </p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {currentServices.map((service) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={service._id}>
                <div className="card shadow-sm rounded p-4 h-100">
                  <h4 className="service-title mb-3 text-primary">
                    {service.providerName.toUpperCase()}
                  </h4>
                  <p className="service-category mb-2">
                    <strong>Category:</strong> {service.serviceCategory}
                  </p>
                  <p className="service-location mb-2">
                    <strong>Location:</strong> {service.city}, {service.state}
                  </p>
                  <p className="service-rate mb-2">
                    <strong>Rate:</strong> {service.rate}
                  </p>
                  <p className="service-description text-truncate">
                    {service.description}
                  </p>
                  <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => handleViewDetails(service._id)}
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
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
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

export default DisplayService;
