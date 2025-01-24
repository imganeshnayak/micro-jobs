import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FaComments, 
  FaUserCircle, 
  FaSpinner,
  FaExclamationTriangle 
} from 'react-icons/fa';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = JSON.parse(localStorage.getItem('user'))?._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/user/${userId}/rooms`);
        const enrichedRooms = await Promise.all(response.data.map(async (room) => {
          const otherParticipantId = room.participants.find((id) => id !== userId);
          const fullName = await fetchUserDetails(otherParticipantId);
          return { ...room, otherParticipantName: fullName };
        }));
        setChatRooms(enrichedRooms);
      } catch (error) {
        setError('Failed to fetch chat rooms. Please try again later.');
        console.error('Error fetching chat rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, [userId]);

  const fetchUserDetails = async (userIdToFetch) => {
    if (userDetails[userIdToFetch]) {
      return userDetails[userIdToFetch];
    }

    try {
      const response = await axios.get(`http://localhost:5000/users/${userIdToFetch}`);
      const fullName = response.data.fullName;
      setUserDetails((prev) => ({
        ...prev,
        [userIdToFetch]: fullName,
      }));
      return fullName;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return 'Unknown User';
    }
  };

  const handleChatClick = (chatRoomId, otherParticipantId) => {
    navigate(`/chat?chatRoomId=${chatRoomId}&senderId=${userId}&receiverId=${otherParticipantId}`);
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <FaSpinner className="fa-spin text-primary mb-3" size={50} />
          <p className="text-muted">Loading chat rooms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <FaExclamationTriangle className="text-danger mb-3" size={50} />
          <p className="text-danger">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-30 col-md-50 col-lg-10 col-xl-10"> {/* Adjusted column width */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaComments className="me-2" size={24} />
              <h4 className="mb-0">Your Chats</h4>
            </div>
            <div className="card-body p-0">
              {chatRooms.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <p>No chat rooms available</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {chatRooms.map((room) => (
                    <div 
                      key={room._id}
                      className="list-group-item list-group-item-action d-flex align-items-center"
                      onClick={() => handleChatClick(room._id, room.participants.find((id) => id !== userId))}
                    >
                      <FaUserCircle className="me-3 text-primary" size={40} />
                      <div>
                        <h5 className="mb-1">{room.otherParticipantName || 'Loading...'}</h5>
                        <small className="text-muted">Click to start chatting</small>
                      </div>
                      <span className="ms-auto badge bg-primary rounded-pill">
                        {room.unreadCount || 0}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
