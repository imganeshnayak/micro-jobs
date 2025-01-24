// ChatRoom.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

const ChatRoom = ({ userId }) => {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chats/${chatRoomId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Join room for real-time updates
    socket.emit('joinRoom', chatRoomId);

    // Listen for new messages
    socket.on('message', (message) => {
      if (message.chatRoomId === chatRoomId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off('message');
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = { senderId: userId, chatRoomId, message: newMessage };
      await axios.post(`/api/chats/send`, messageData);
      socket.emit('sendMessage', messageData); // Emit message for real-time updates
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId === userId ? 'You' : 'Other'}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
