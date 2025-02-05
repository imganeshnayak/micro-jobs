import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { 
  FaEnvelope, 
  FaBriefcase, 
  FaComment, 
  FaEdit, 
  FaTrashAlt, 
  FaComments,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaListUl
} from 'react-icons/fa';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const [userType, setUserType] = useState('worker');
  const [messages, setMessages] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user._id;
  const userName = user.fullName || "User Name";
  const userEmail = user.email || "user@example.com";
  const pfp = user.profilePicture || "";
  console.log(pfp);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const toggleUserType = () => {
    setUserType(userType === 'worker' ? 'hirer' : 'worker');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/user-details'); // Redirect to the edit profile page
  };

  useEffect(() => {

    const fetchNotificationsAndMessages = async () => {
      try {
        setLoading(true);

        // Fetch notifications
        const notificationsResponse = await axios.get(
          `${API_BASE_URL}/notifications/${userId}`
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
          type: 'notification', // Indicate it's a notification
          message: notification.message,
          actions: {
            accept: () => handleAccept(notification.jobId),
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
      const response = await axios.get(`${API_BASE_URL}/jobs/user/${userId}`);
      setUserJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };
  const fetchJobOffers = async () => {
    try {
      setLoading(true);
      
      const userPincode = user.pincode;
      const response = await axios.get(`${API_BASE_URL}/jobs?pincode=${userPincode}`);
      
      // Limit job offers to 3 or 4
      const jobData = response.data.slice(0, 4); // Change to `.slice(0, 3)` if you only want 3 jobs
  
      setJobOffers(jobData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job offers:', error);
      setLoading(false);
    }
  };
  

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`${API_BASE_URL}/jobs/${jobId}`);
      setUserJobs(userJobs.filter((job) => job._id !== jobId));
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleAccept = async () => {
    try {
      const notificationsResponse = await axios.get(
        `${API_BASE_URL}/notifications/${userId}`
      );
      const notifications = notificationsResponse.data;
      const notification = notifications[0];
      const chatRoomId = notification.chatRoomId;

      if (!chatRoomId) {
        console.error("Chat Room ID is missing in the notification.");
        return;
      }

      const chatRoomResponse = await axios.get(
        `${API_BASE_URL}/chat/${chatRoomId}`
      );

      const { senderId, receiverId } = chatRoomResponse.data;

      if (!senderId || !receiverId) {
        console.error("Sender ID or Receiver ID is missing in the chat room.");
        return;
      }

      navigate(`/chat?chatRoomId=${chatRoomId}&senderId=${senderId}&receiverId=${receiverId}`);
    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`);
      setMessages(prevMessages => 
        prevMessages.filter(message => message.id !== notificationId)
      );
      console.log('Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleEditJob = (jobId) => {
    alert(`Edit job with ID: ${jobId}`);
  };

  return (
    <div className="user-panel bg-light min-vh-100">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-dark text-white p-4">
            <div className="text-center mb-4">
              <img 
                src={pfp}
                alt="Profile" 
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4>{userName}</h4>
              <p className="text-muted">{userEmail}</p>
              <button 
                className="btn btn-outline-light btn-sm mb-3" 
                onClick={toggleUserType}
              >
                Switch to {userType === 'worker' ? 'Hirer' : 'Worker'}
              </button>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <button 
                  className="btn btn-outline-light w-100 text-start"
                  onClick={handleEditProfile}
                >
                  <FaEdit className="me-2" /> Edit Profile
                </button>
              </li>
              <li className="nav-item mb-2">
                <button 
                  className="btn btn-outline-light w-100 text-start"
                  onClick={() => navigate('/chat')}
                >
                  <FaComments className="me-2" /> Chat List
                </button>
              </li>
              <li className="nav-item mb-2">
                <button 
                  className="btn btn-outline-light w-100 text-start"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-2" /> Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 p-4">
            {/* Messages & Notifications */}
            <div className="card mb-4">
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <FaBell className="me-2" />
                Messages & Notifications
              </div>
              <div className="card-body">
                {loading ? (
                  <LoadingSpinner />
                ) : messages.length > 0 ? (
                  messages.map((message) => (
                    <div 
                      key={message.id} 
                      className="alert alert-light d-flex justify-content-between align-items-center mb-3"
                    >
                      <span>{message.message}</span>
                      {message.type === 'notification' && (
                        <div className="d-flex">
                          <button 
                            className="btn btn-success btn-sm me-2" 
                            onClick={message.actions.accept}
                          >
                            Accept
                          </button>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={message.actions.delete}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No messages or notifications.</p>
                )}
              </div>
            </div>

            {/* Jobs Section */}
            <div className="card">
              <div className="card-header bg-success text-white d-flex align-items-center">
                <FaListUl className="me-2" />
                {userType === 'worker' ? 'Job Offers' : 'Your Posted Jobs'}
              </div>
              <div className="card-body">
                {loading ? (
                  <LoadingSpinner />
                ) : userType === 'worker' ? (
                  jobOffers.length > 0 ? (
                    jobOffers.map((offer) => (
                      <div key={offer.id} className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{offer.role}</h5>
                          <p className="card-text text-muted">Company : {offer.company}</p>
                          <p className="card-text">
                            <strong className="text-success">Salary : {offer.salary}</strong>
                          </p>
                          <p className="card-text">
                            <strong className="text-success">posted by : {offer.posterName}</strong>
                          </p>
                          <button className="btn btn-outline-success">Apply Now</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted">No job offers available.</p>
                  )
                ) : (
                  userJobs.length > 0 ? (
                    userJobs.map((job) => (
                      <div key={job._id} className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{job.title}</h5>
                          <div className="row">
                            <div className="col-md-6">
                              <p className="card-text">
                                <strong>Company:</strong> {job.company}
                              </p>
                              <p className="card-text">
                                <strong>Location:</strong> {job.location}
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p className="card-text">
                                <strong>Salary:</strong> {job.salary}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 d-flex flex-wrap gap-2">
                            <button 
                              className="btn btn-warning"
                              onClick={() => handleEditJob(job._id)}
                            >
                              <FaEdit className="me-1" /> Edit
                            </button>
                            <button 
                              className="btn btn-danger"
                              onClick={() => handleDeleteJob(job._id)}
                            >
                              <FaTrashAlt className="me-1" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted">No jobs posted yet.</p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;