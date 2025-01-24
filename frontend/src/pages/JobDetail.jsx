
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from '../components/Chat';

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [jobPosterId, setJobPosterId] = useState(null);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        setError('Failed to fetch job details. Please try again later.');
        toast.error('Failed to fetch job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  useEffect(() => {
    if (job) {
      setJobPosterId(job.userId);
    }
  }, [job]);

  const handleMessageClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/chat/rooms', {
        senderId: userId,
        receiverId: jobPosterId,
      });

      const chatRoomId = response.data.chatRoomId;
      if (!chatRoomId) {
        throw new Error('Chat room ID is missing in the response');
      }

      // Send notification with chat room ID
      await axios.post('http://localhost:5000/chat/send', {
        receiverId: jobPosterId,
        senderId: userId,
        message: 'New job application received',
        chatRoomId: chatRoomId,
      });

      toast.success('Redirecting to chat page...');
      navigate(`/chat?chatRoomId=${chatRoomId}&senderId=${userId}&receiverId=${jobPosterId}`);
    } catch (error) {
      toast.error('Unable to send message. Please try again.');
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-danger mt-5">
        <h2>{error}</h2>
      </div>
    );

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <BreadCrumbs title="Job Details" />
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          {/* Header */}
          <div
            className="card-header text-center py-4"
            style={{
              background: 'linear-gradient(90deg, #4CAF50, #2E7D32)',
              color: 'white',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <h1 className="fw-bold mb-0">{job.title}</h1>
            <p className="fs-5 mt-2">{job.company}</p>
          </div>

          {/* Body */}
          <div className="card-body px-5 py-4">
            <div className="row g-4">
              <div className="col-lg-8">
                <h4 className="fw-bold text-success mb-3">Job Details</h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Location:</strong> {job.location}
                  </li>
                  <li>
                    <strong>Salary:</strong> {job.salary}
                  </li>
                  <li>
                    <strong>State:</strong> {job.state}
                  </li>
                  <li>
                    <strong>Description:</strong> {job.description}
                  </li>
                </ul>

                <h4 className="fw-bold text-success mt-4 mb-3">Job Requirements</h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Category:</strong> {job.category}
                  </li>
                  <li>
                    <strong>Job Type:</strong> {job.jobType}
                  </li>
                </ul>
              </div>

              <div className="col-lg-4">
                {/* Sidebar */}
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="fw-bold text-success mb-4">Posted By</h5>
                    <p>
                      <strong>Name:</strong> {job.posterName}
                    </p>
                    <p>
                      <strong>Email:</strong> {job.email}
                    </p>
                    <button
                      className="btn btn-success w-100 mt-3"
                      onClick={handleMessageClick}
                      style={{
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="card-footer text-center py-3"
            style={{
              backgroundColor: '#f8f9fa',
              fontSize: '0.9rem',
            }}
          >
            <p className="mb-0 text-muted">
              For more details, contact <strong>{job.email}</strong>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
      