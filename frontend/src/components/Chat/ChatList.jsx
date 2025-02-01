
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
// import './ChatList.css';

// const ChatList = () => {
//   const [chatRooms, setChatRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const userId = JSON.parse(localStorage.getItem('user'))?._id;
//   const user = JSON.parse(localStorage.getItem('user')) || {};
//   const userId = user._id;
//   const pfp=user.profilePicture || "" ;
// console.log(pfp);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/chat/user/${userId}/rooms`);
//         const enrichedRooms = response.data.map((room) => {
//           const otherParticipant = room.participants.find(
//             (participant) => participant._id !== userId
//           );
//           return {
//             ...room,
//             otherParticipantId: otherParticipant?._id,
//             otherParticipantName: otherParticipant?.fullName || 'Unknown User',
//           };
//         });
//         setChatRooms(enrichedRooms);
//       } catch (error) {
//         setError('Failed to fetch chat rooms. Please try again later.');
//         console.error('Error fetching chat rooms:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatRooms();
//   }, [userId]);

//   const handleChatClick = (chatRoomId, otherParticipantId, otherParticipantName) => {
//     navigate(
//       `/chat?chatRoomId=${chatRoomId}&senderId=${userId}&receiverId=${otherParticipantId}&receiverName=${otherParticipantName}`
//     );
//   };

//   return (
//     <div className="chatlist-container">
//       {/* Header */}
//       <header className="chatlist-header">
//             <img src="https://res.cloudinary.com/dahotkqpi/image/upload/v1737894843/Picsart_24-12-28_11-43-30-861_dcexok.png" alt="Logo" className="chatlist-logo" />
//         <h1 className="chatlist-title">Chats</h1>
//       </header>

//       {/* Body */}
//       <div className="chatlist-body">
//         {loading ? (
//           <div className="loading">
//             <FaSpinner className="loading-icon" size={50} />
//             <p>Loading chat rooms...</p>
//           </div>
//         ) : error ? (
//           <div className="error">
//             <FaExclamationTriangle className="error-icon" size={50} />
//             <p>{error}</p>
//           </div>
//         ) : chatRooms.length === 0 ? (
//           <div className="empty-state">
//             <p>No chat rooms found. Start chatting with someone!</p>
//           </div>
//         ) : (
//           <ul className="chatlist-items">
//             {chatRooms.map((room) => (
//               <li
//                 key={room._id}
//                 className="chatlist-item"
//                 onClick={() =>
//                   handleChatClick(room._id, room.otherParticipantId, room.otherParticipantName)
//                 }
//               >
//                 <div className="avatar">
//                   {room.otherParticipantName.charAt(0).toUpperCase()}
//                 </div>
//                 <div className="chat-details">
//                   <h3 className="chat-name">{room.otherParticipantName}</h3>
//                   <p className="chat-preview">Click to view messages</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './ChatList.css';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Retrieve user details from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user._id;
  const userProfilePic = user.profilePicture || '';

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/user/${userId}/rooms`);
        const enrichedRooms = response.data.map((room) => {
          const otherParticipant = room.participants.find(
            (participant) => participant._id !== userId
          );
          return {
            ...room,
            otherParticipantId: otherParticipant?._id,
            otherParticipantName: otherParticipant?.fullName || 'Unknown User',
            otherParticipantPic: otherParticipant?.profilePicture || '',
          };
        });
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

  const handleChatClick = (chatRoomId, otherParticipantId, otherParticipantName) => {
    navigate(
      `/chat?chatRoomId=${chatRoomId}&senderId=${userId}&receiverId=${otherParticipantId}&receiverName=${otherParticipantName}`
    );
  };

  return (
    <div className="chatlist-container">
      {/* Header */}
      <header className="chatlist-header">
        <img
          src="https://res.cloudinary.com/dahotkqpi/image/upload/v1737894843/Picsart_24-12-28_11-43-30-861_dcexok.png"
          alt="Logo"
          className="chatlist-logo"
        />
        <h1 className="chatlist-title">Chats</h1>
      </header>

      {/* Body */}
      <div className="chatlist-body">
        {loading ? (
          <div className="loading">
            <FaSpinner className="loading-icon" size={50} />
            <p>Loading chat rooms...</p>
          </div>
        ) : error ? (
          <div className="error">
            <FaExclamationTriangle className="error-icon" size={50} />
            <p>{error}</p>
          </div>
        ) : chatRooms.length === 0 ? (
          <div className="empty-state">
            <p>No chat rooms found. Start chatting with someone!</p>
          </div>
        ) : (
          <ul className="chatlist-items">
            {chatRooms.map((room) => (
              <li
                key={room._id}
                className="chatlist-item"
                onClick={() =>
                  handleChatClick(room._id, room.otherParticipantId, room.otherParticipantName)
                }
              >
                {/* Profile Picture or Avatar */}
                <div className="avatar">
                  {room.otherParticipantPic ? (
                    <img src={room.otherParticipantPic} alt="Profile" className="profile-pic" />
                  ) : (
                    <span>{room.otherParticipantName.charAt(0).toUpperCase()}</span>
                  )}
                </div>

                <div className="chat-details">
                  <h3 className="chat-name">{room.otherParticipantName}</h3>
                  <p className="chat-preview">Click to view messages</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatList;
