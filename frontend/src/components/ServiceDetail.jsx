
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BreadCrumbs from "./BreadCrumbs";

const ServiceDetails = () => {
  const { serviceId } = useParams(); // Get serviceId from the route
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        toast.error("Failed to fetch service details");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleViewProfile = () => {
    if (service?.userId) {
      navigate(`/user-profile/${service.userId}`);
    } else {
      toast.error("User ID not found for this service");
    }
  };

  if (loading)
    return (
      <div className="loading-spinner d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!service)
    return (
      <div className="error-message text-center text-danger mt-5">
        <h2>Service not found</h2>
      </div>
    );

  return (
    <>
      <div className="container-xxl p-0">
        <Navbar />
        <BreadCrumbs title="Service Details" />
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col text-center">
              <h1 className="display-5">Service Details</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="service-detail-card shadow-sm rounded p-4">
                <h2 className="service-title mb-3 text-primary text-center">
                  {service.providerName.toUpperCase()}
                </h2>
                <p>
                  <strong>Category:</strong> {service.serviceCategory}
                </p>
                <p>
                  <strong>Description:</strong> {service.description || "No description provided"}
                </p>
                <p>
                  <strong>Location:</strong> {service.city}, {service.state}, {service.pincode}
                </p>
                <p>
                  <strong>Rate:</strong> {service.rate}
                </p>
                <p>
                  <strong>Availability:</strong> {service.availability}
                </p>
                <p>
                  <strong>Experience:</strong> {service.experience} years
                </p>
                <p>
                  <strong>Contact:</strong> {service.phone || "Not provided"}
                </p>
                {/* Add a button to view the user's profile */}
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary mt-3" onClick={handleViewProfile}>
                    View Provider's Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ServiceDetails;
