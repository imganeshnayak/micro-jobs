import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PostJob.css'; // Optional: Add your CSS for styling
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BreadCrumbs from '../../components/BreadCrumbs';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaUser, FaEnvelope,FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const CATEGORIES = [
  "Accommodation",
  "Astrology",
  "Automobiles & Two Wheelers",
  "Beauty, Fitness & Sports",
  "Business & Legal",
  "Education",
  "Events & Weddings",
  "Food & Restaurants",
  "Health & Medical",
  "Home Services",
  "Others",
  "Transportation & Shipping",
  "Travel"
];
const PostJob = () => {

    const navigate = useNavigate();
  
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    pincode: '',
    posterName: '',
    state: '',
    category: '',
    email: '',
    jobType: 'Full-Time', // Default value for jobType

  });


  const handleServiceRegistration = () => {
    navigate('/service-post');
  };
  const handleInputChange = (event) => {
    const user = JSON.parse(localStorage.getItem('user')) // Corrected key for user
    const userId = user ? user._id : ''; // If no user is logged in, use an empty string
    
    const { name, value } = event.target;
    setJobData({
      ...jobData,
      userId,  // Set userId from localStorage (or empty string if no user)
      [name]: value,
    });
  };
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
      toast.success(response.data.message); // Show success toast
      
      // Reset the form
      setJobData({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        pincode: '',
        posterName: '',
        state: '',
        category: '',
        email: '',
        jobType: 'Full-Time', // Reset to default value

      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job'); // Show error toast
    }
  };

  return (
    <div>
      <Navbar />
      <BreadCrumbs title="Post a Job" />
         
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <h1 className="mb-3">Post a New Job</h1>
            <p className="text-muted">Fill in the details below to post your job listing</p>
          </div>
          <button 
              className="btn btn-outline-primary mt-3"
              onClick={handleServiceRegistration}
            >
              <FaTools className="me-2" />
              Register as Service Provider
            </button>
          <div className="bg-white rounded-3 shadow p-5 wow fadeInUp" data-wow-delay="0.2s">
            <form onSubmit={handleSubmit} className="row g-4">
              {/* Job Basic Info */}
              <div className="col-12">
                <h5 className="section-title bg-white text-start text-primary px-3">Basic Information</h5>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Job Title"
                    value={jobData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="title"><FaBriefcase className="me-2" />Job Title</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="Company Name"
                    value={jobData.company}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="company"><FaBuilding className="me-2" />Company</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Job Description"
                    style={{ height: '150px' }}
                    value={jobData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label htmlFor="description">Description</label>
                </div>
              </div>

              {/* Location & Salary */}
              <div className="col-12">
                <h5 className="section-title bg-white text-start text-primary px-3 mt-4">Location & Compensation</h5>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    placeholder="Location"
                    value={jobData.location}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="location"><FaMapMarkerAlt className="me-2" />Location</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="state"
                    name="state"
                    value={jobData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <label htmlFor="state">State</label>
                </div>
              </div>


              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="salary"
                    name="salary"
                    placeholder="Salary"
                    value={jobData.salary}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="salary"><FaDollarSign className="me-2" />Salary</label>
                </div>
              </div>
              <div className="col-md-4">
  <div className="form-floating">
    <input
      type="text"
      className="form-control"
      id="pincode"
      name="pincode"
      placeholder="Pincode"
      value={jobData.pincode}
      onChange={handleInputChange}
      required
    />
    <label htmlFor="pincode">Pincode</label>
  </div>
</div>

              {/* Additional Details */}
              <div className="col-12">
                <h5 className="section-title bg-white text-start text-primary px-3 mt-4">Additional Details</h5>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="jobType"
                    name="jobType"
                    value={jobData.jobType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Time-Based">Time-Based</option>
                  </select>
                  <label htmlFor="jobType">Job Type</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={jobData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <label htmlFor="category">Category</label>
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-12">
                <h5 className="section-title bg-white text-start text-primary px-3 mt-4">Contact Information</h5>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="posterName"
                    name="posterName"
                    placeholder="Your Name"
                    value={jobData.posterName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="posterName"><FaUser className="me-2" />Your Name</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={jobData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="email"><FaEnvelope className="me-2" />Email</label>
                </div>
              </div>

              <div className="col-12 text-center">
                <button className="btn btn-primary py-3 px-5" type="submit">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostJob;