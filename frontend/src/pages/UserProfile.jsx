
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";

const UserProfile = () => {
  const { userId } = useParams(); // Get userId from the route
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading)
    return (
      <div className="loading-spinner d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="error-message text-center text-danger mt-5">
        <h2>User not found</h2>
      </div>
    );

  return (
    <>
      <div className="container-xxl p-0">
        <Navbar />
        <BreadCrumbs title="User Profile" />
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col text-center">
              <h1 className="display-5">User Profile</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="user-profile-card shadow-sm rounded p-4 text-center">
                <h2 className="user-name mb-3 text-primary">{user.name}</h2>
                <img
                  src={user.profilePicture || "https://via.placeholder.com/150"}
                  alt={`${user.name}'s profile`}
                  className="img-fluid rounded-circle mt-3"
                  style={{ maxWidth: "150px" }}
                />
                <p>
                  <strong>Name:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
                <p>
                  <strong>Address:</strong> {user.address || "Not provided"}
                </p>
                <p>
                  <strong>Pincode:</strong> {user.pincode || "Not provided"}
                </p>
                <p>
                  <strong>Ratings:</strong>{" "}
                  {user.ratings.length > 0
                    ? user.ratings.map((rating, index) => (
                        <span key={index} className="badge bg-success me-2">
                          {rating.rating}★
                        </span>
                      ))
                    : "No ratings available"}
                </p>
              
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfile;
