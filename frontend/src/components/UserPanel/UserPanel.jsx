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
  FaSignOutAlt
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
  
  const navigate = useNavigate();

  const toggleUserType = () => {
    setUserType(userType === 'worker' ? 'hirer' : 'worker');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
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

  
 
  const handleAccept = async () => {
    try {
      // Fetch all notifications for the user
      const notificationsResponse = await axios.get(
        `http://localhost:5000/notifications/${userId}`
      );
  
      // Log the entire notifications response for debugging
      console.log("Notifications Response:", notificationsResponse.data);
  
      // Assuming `notificationsResponse.data` is an array of notification objects
      const notifications = notificationsResponse.data;
  
      if (!notifications || notifications.length === 0) {
        console.error("No notifications found for the user.");
        return;
      }
  
      // Log each notification to understand its structure
      notifications.forEach((notification) => {
        console.log("Notification:", notification);
      });
  
      // Assume you want to process only the first notification for this example
      const notification = notifications[0]; // Adjust based on your requirements
  
      console.log("Processing Notification:", notification);
  
      // Extract chatRoomId from the notification
      const chatRoomId = notification.chatRoomId; 
  
      if (!chatRoomId) {
        console.error("Chat Room ID is missing in the notification.");
        return;
      }
  
      console.log(`Chat Room ID: ${chatRoomId}`);
  
      // Fetch the chat room details using the chatRoomId
      const chatRoomResponse = await axios.get(
        `http://localhost:5000/chat/${chatRoomId}`
      );
  
      const { senderId, receiverId } = chatRoomResponse.data;
  
      if (!senderId || !receiverId) {
        console.error("Sender ID or Receiver ID is missing in the chat room.");
        return;
      }
  
      console.log(`Sender ID: ${senderId}`);
      console.log(`Receiver ID: ${receiverId}`);
  
      // Navigate to the chat with the chatRoomId, senderId, and receiverId
      navigate(`/chat?chatRoomId=${chatRoomId}&senderId=${senderId}&receiverId=${receiverId}`);
    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };
  


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
    <div className="user-panel bg-light min-vh-100">
      <Navbar />
      <div className="container py-4">
        <div className="row">
          {/* Profile Section */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="position-relative d-inline-block mb-3">
                  <img 
                    src="https://via.placeholder.com/150" 
                    alt="Profile" 
                    className="img-fluid rounded-circle mb-3 shadow"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                    <FaEdit />
                  </button>
                </div>
                <h3 className="card-title">{userName}</h3>
                <p className="text-muted mb-2">
                  <FaEnvelope className="me-2" />{userEmail}
                </p>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <span className={`badge ${userType === 'worker' ? 'bg-primary' : 'bg-success'} me-2`}>
                    <FaBriefcase className="me-1" /> 
                    {userType.charAt(0).toUpperCase() + userType.slice(1)}
                  </span>
                  <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={toggleUserType}
                  >
                    Switch to {userType === 'worker' ? 'Hirer' : 'Worker'}
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <button 
                    className="btn btn-outline-primary me-2" 
                    onClick={() => navigate('/chatlist')}
                  >
                    <FaComments className="me-1" /> Chat List
                  </button>
                  <button 
                    className="btn btn-outline-danger" 
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-1" /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="col-md-8">
            {/* Messages & Notifications */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <FaComment className="me-2" />
                Messages & Notifications
              </div>
              <div className="card-body">
                {loading ? (
                  <LoadingSpinner />
                ) : messages.length > 0 ? (
                  messages.map((message) => (
                    <div 
                      key={message.id} 
                      className="alert alert-light d-flex justify-content-between align-items-center"
                    >
                      <span>{message.message}</span>
                      {message.type === 'notification' && (
                        <div>
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
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <FaBriefcase className="me-2" />
                {userType === 'worker' ? 'Job Offers' : 'Your Posted Jobs'}
              </div>
              <div className="card-body">
                {loading ? (
                  <LoadingSpinner />
                ) : userType === 'worker' ? (
                  jobOffers.length > 0 ? (
                    jobOffers.map((offer) => (
                      <div key={offer.id} className="card mb-3 border-light">
                        <div className="card-body">
                          <h5 className="card-title">{offer.role}</h5>
                          <p className="card-text text-muted">{offer.company}</p>
                          <p className="card-text">
                            <strong className="text-success">{offer.salary}</strong>
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
                      <div key={job._id} className="card mb-3 border-light">
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
                          <div className="job-actions mt-3">
                            <button 
                              className="btn btn-warning me-2" 
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