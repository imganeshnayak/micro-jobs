import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const Chat = ({ chatRoomId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io('http://localhost:5000'); // Connect to your server

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`http://localhost:5000/chat/${chatRoomId}/messages`);
      setMessages(response.data);
    };

    fetchMessages();

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        chatRoomId,
        senderId: userId,
        message: newMessage,
      };

      await axios.post('http://localhost:5000/chat/send', messageData);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.senderId === userId ? 'my-message' : 'other-message'}>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;