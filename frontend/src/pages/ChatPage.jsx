import React from 'react';
import Chat from '../components/Chat';
import ChatList from '../components/ChatList';


const ChatPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const chatRoomId = queryParams.get('chatRoomId');
  const senderId = queryParams.get('senderId');
  const receiverId = queryParams.get('receiverId');

  if (!chatRoomId || !senderId || !receiverId) {
    return (

      <div className="error-message text-center text-danger mt-5">

        <h2>Invalid chat parameters. Please try again.</h2>
      </div>
    );
  }

  return (
    <div>
      <Chat chatRoomId={chatRoomId} senderId={senderId} receiverId={receiverId} />
    </div>
  );
};

export default ChatPage;
