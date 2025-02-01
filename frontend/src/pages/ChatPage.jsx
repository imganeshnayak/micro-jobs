
// import React, { useState, useEffect } from 'react';
// import Chat from '../components/Chat/Chat';
// import ChatList from '../components/Chat/ChatList';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './ChatPage.css';

// const ChatPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);

//   const [selectedChat, setSelectedChat] = useState(null);

//   useEffect(() => {
//     // Update selectedChat when URL changes
//     const chatRoomId = queryParams.get('chatRoomId');
//     const senderId = queryParams.get('senderId');
//     const receiverId = queryParams.get('receiverId');
//     const receiverName = queryParams.get('receiverName');

//     if (chatRoomId && senderId && receiverId) {
//       setSelectedChat({ chatRoomId, senderId, receiverId, receiverName });
//     }
//   }, [location.search]);

//   const handleChatSelect = (chatRoomId, receiverId, receiverName) => {
//     const senderId = JSON.parse(localStorage.getItem('user'))?._id;

//     // Update state and URL
//     setSelectedChat({ chatRoomId, senderId, receiverId, receiverName });
//     navigate(
//       `/chat?chatRoomId=${chatRoomId}&senderId=${senderId}&receiverId=${receiverId}&receiverName=${receiverName}`
//     );
//   };

//   return (
//     <div className="chat-page-container">
//       {/* Chat List */}
//       <div className="chat-list-container">
//         <ChatList onChatSelect={handleChatSelect} />
//       </div>

//       {/* Chat Interface */}
//       <div className="chat-interface-container">
//         {selectedChat ? (
//           <Chat
//             key={selectedChat.chatRoomId}
//             chatRoomId={selectedChat.chatRoomId}
//             senderId={selectedChat.senderId}
//             receiverId={selectedChat.receiverId}
//             receiverName={selectedChat.receiverName}
//           />
//         ) : (
//           <div className="no-chat-selected">
//             <p>Select a chat to start messaging.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import React, { useState, useEffect } from 'react';
import Chat from '../components/Chat/Chat';
import ChatList from '../components/Chat/ChatList';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Check if mobile view

  useEffect(() => {
    // Update selectedChat when URL changes
    const chatRoomId = queryParams.get('chatRoomId');
    const senderId = queryParams.get('senderId');
    const receiverId = queryParams.get('receiverId');
    const receiverName = queryParams.get('receiverName');

    if (chatRoomId && senderId && receiverId) {
      setSelectedChat({ chatRoomId, senderId, receiverId, receiverName });
    }
  }, [location.search]);

  // Handle window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChatSelect = (chatRoomId, receiverId, receiverName) => {
    const senderId = JSON.parse(localStorage.getItem('user'))?._id;

    // Update state and URL
    setSelectedChat({ chatRoomId, senderId, receiverId, receiverName });
    navigate(
      `/chat?chatRoomId=${chatRoomId}&senderId=${senderId}&receiverId=${receiverId}&receiverName=${receiverName}`
    );
  };

  return (
    <div className="chat-page-container">
      {/* Chat List */}
      <div
        className={`chat-list-container ${
          isMobileView && selectedChat ? 'hidden' : ''
        }`}
      >
        <ChatList onChatSelect={handleChatSelect} />
      </div>

      {/* Chat Interface */}
      <div
        className={`chat-interface-container ${
          isMobileView && !selectedChat ? 'hidden' : ''
        }`}
      >
        {selectedChat ? (
          <Chat
            key={selectedChat.chatRoomId}
            chatRoomId={selectedChat.chatRoomId}
            senderId={selectedChat.senderId}
            receiverId={selectedChat.receiverId}
            receiverName={selectedChat.receiverName}
            onBack={() => setSelectedChat(null)} // Add back button for mobile view
          />
        ) : (
          <div className="no-chat-selected">
            <p>Select a chat to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;