import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BreadCrumbs from '../../components/BreadCrumbs';
import { FaTools, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
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
  "Plumbing", "Electrical", "Cleaning", "Repairs", "Painting",
  "Gardening", "IT Services", "Carpentry", "Transportation",
  "Catering", "Others"
];

const PostService = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : '';

  const [serviceData, setServiceData] = useState({
    userId, // Include userId in the initial state
    providerName: '',
    email: '',
    phone: '',
    serviceCategory: '',
    description: '',
    state: '',
    city: '',
    pincode: '',
    experience: '',
    rate: '',
    availability: 'Full-Time' // Default availability
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setServiceData({
      ...serviceData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/services', serviceData);
      toast.success(response.data.message);

      // Reset the form
      setServiceData({
        userId,
        providerName: '',
        email: '',
        phone: '',
        serviceCategory: '',
        description: '',
        state: '',
        city: '',
        pincode: '',
        experience: '',
        rate: '',
        availability: 'Full-Time'
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post service');
    }
  };

  return (
    <div>
      <Navbar />
      <BreadCrumbs title="Post a Service" />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h1 className="mb-3">Post a New Service</h1>
            <p className="text-muted">Fill in the details below to post your service listing</p>
          </div>
          <div className="bg-white rounded-3 shadow p-5">
            <form onSubmit={handleSubmit} className="row g-4">
              {/* Provider Information */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="providerName"
                    name="providerName"
                    placeholder="Your Name"
                    value={serviceData.providerName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="providerName"><FaUser className="me-2" />Your Name</label>
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
                    value={serviceData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="email"><FaEnvelope className="me-2" />Email</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={serviceData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="phone"><FaPhoneAlt className="me-2" />Phone</label>
                </div>
              </div>

              {/* Service Details */}
              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="serviceCategory"
                    name="serviceCategory"
                    value={serviceData.serviceCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <label htmlFor="serviceCategory">Service Category</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="rate"
                    name="rate"
                    placeholder="Rate"
                    value={serviceData.rate}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="rate">Rate (e.g., ₹500/day)</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="experience"
                    name="experience"
                    placeholder="Experience"
                    value={serviceData.experience}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="experience">Experience (e.g., 2 years)</label>
                </div>
              </div>

              {/* Location Details */}
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={serviceData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="city"><FaMapMarkerAlt className="me-2" />City</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="state"
                    name="state"
                    value={serviceData.state}
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
                    id="pincode"
                    name="pincode"
                    placeholder="Pincode"
                    value={serviceData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="pincode">Pincode</label>
                </div>
              </div>

              {/* Submit */}
              <div className="col-12 text-center">
                <button className="btn btn-primary py-3 px-5" type="submit">
                  Post Service
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

export default PostService;
