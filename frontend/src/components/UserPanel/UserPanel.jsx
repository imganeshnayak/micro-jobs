import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { FaEnvelope, FaBriefcase, FaComment, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner'; // Import your LoadingSpinner component
import './UserPanel.css'; // Custom CSS (if needed)
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const [userType, setUserType] = useState('worker'); // Initially worker
  const [messages, setMessages] = useState([]); // Store messages and notifications combined
  const [userJobs, setUserJobs] = useState([]); // For jobs posted by the user
  const [jobOffers, setJobOffers] = useState([]); // For job offers (worker type)
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('user'))?._id; // Extract user ID from localStorage
  const navigate = useNavigate();

  const toggleUserType = () => {
    setUserType(userType === 'worker' ? 'hirer' : 'worker');
  };

  useEffect(() => {
    const fetchNotificationsAndMessages = async () => {
      try {
        setLoading(true);

        // Fetch notifications
        const notificationsResponse = await axios.get(
          `http://localhost:5000/notifications/${userId}`
        );

        // Fetch user jobs or job offers
        if (userType === 'hirer') {
          fetchUserJobs(userId);
        } else {
          fetchJobOffers();
        }

        // Combine notifications into the messages array
        const notifications = notificationsResponse.data.map((notification) => ({
          id: notification._id,
          type: 'notification', // Indicate it’s a notification
          message: notification.message,
          actions: {
            accept: () => handleAccept(notification._id),
            delete: () => handleDelete(notification._id),
          },
        }));

        setMessages(notifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchNotificationsAndMessages();
  }, [userId, userType]);

  const fetchUserJobs = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/jobs/user/${userId}`);
      setUserJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const fetchJobOffers = () => {
    // Dummy job offers for the worker (replace with real API calls)
    setJobOffers([
      { id: 1, company: 'Tech Corp', role: 'Frontend Developer', salary: '$5000' },
      { id: 2, company: 'Dev Inc', role: 'UI Developer', salary: '$4500' },
    ]);
    setLoading(false);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
      setUserJobs(userJobs.filter((job) => job._id !== jobId));
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleAccept = async (notificationId) => {
    try {
      const response = await axios.post(`http://localhost:5000/notifications/accept/${notificationId}`);
      if (response.data.chatRoomId) {
        navigate(`/chat/${response.data.chatRoomId}`);
      }
    } catch (error) {
      console.error('Error accepting notification:', error);
    }
  };

  // const handleDelete = async (notificationId) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/notifications/${notificationId}`);
  //     setMessages(messages.filter((msg) => msg.id !== notificationId));
  //   } catch (error) {
  //     console.error('Error deleting notification:', error);
  //   }
  // };


  const handleDelete = async (notificationId) => {
    try {
      console.log('Deleting notification:', notificationId);
      
      const response = await axios.delete(`http://localhost:5000/notifications/${notificationId}`);
      
      if (response.status === 200) {
        // Only filter out the specific notification that was deleted
        setMessages(prevMessages => 
          prevMessages.filter(message => message.id !== notificationId)
        );
        console.log('Notification deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleEditJob = (jobId) => {
    alert(`Edit job with ID: ${jobId}`);
  };

  return (
    <div className="user-panel container">
      <Navbar />
      <div className="profile-section my-4">
        <div className="profile-header d-flex align-items-center">
          <div className="profile-image me-3">
            <img src="https://via.placeholder.com/150" alt="Profile" className="img-fluid rounded-circle" />
            <button className="btn btn-outline-secondary edit-photo">
              <FaEdit />
            </button>
          </div>
          <div className="profile-info">
            <h2>Alex Johnson</h2>
            <p className="email">
              <FaEnvelope /> alex@example.com
            </p>
            <div className="user-type">
              <span className={`badge ${userType === 'worker' ? 'bg-primary' : 'bg-success'}`}>
                <FaBriefcase /> {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </span>
              <button className="btn btn-link toggle-type" onClick={toggleUserType}>
                Switch to {userType === 'worker' ? 'Hirer' : 'Worker'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Messages and Notifications Section */}
      <div className="panel-content">
        <div className="messages-section mb-4">
          <h3>
            <FaComment /> Messages & Notifications
          </h3>
          <div className="list-group">
            {loading ? (
              <LoadingSpinner /> // Show loading spinner while data is loading
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <div key={message.id} className="list-group-item">
                  <p>{message.message}</p>
                  {message.type === 'notification' && (
                    <div className="notification-actions">
                      <button className="btn btn-success btn-sm me-2" onClick={message.actions.accept}>
                        Accept
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={message.actions.delete}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No messages or notifications available.</p>
            )}
          </div>
        </div>

        {/* Job Offers Section */}
        <div className="offers-section">
          <h3>
            <FaBriefcase /> {userType === 'worker' ? 'Job Offers' : 'Your Posted Jobs'}
          </h3>
          <div className="offers-list">
            {loading ? (
              <LoadingSpinner />
            ) : userType === 'worker' ? (
              jobOffers.length > 0 ? (
                jobOffers.map((offer) => (
                  <div key={offer.id} className="offer-card card mb-3">
                    <div className="card-body">
                      <h4 className="card-title">{offer.role}</h4>
                      <p className="card-text">{offer.company}</p>
                      <p className="card-text">
                        <strong>{offer.salary}</strong>
                      </p>
                      <button className="btn btn-success">Apply Now</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No job offers available at the moment.</p>
              )
            ) : (
              userJobs.length > 0 ? (
                userJobs.map((job) => (
                  <div key={job._id} className="offer-card card mb-3">
                    <div className="card-body">
                      <h4 className="card-title">{job.title}</h4>
                      <p className="card-text">
                        <strong>Company:</strong> {job.company}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p className="card-text">
                        <strong>Salary:</strong> {job.salary}
                      </p>
                      <div className="job-actions">
                        <button className="btn btn-warning me-2" onClick={() => handleEditJob(job._id)}>
                          <FaEdit /> Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeleteJob(job._id)}>
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>You have not posted any jobs yet.</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;



