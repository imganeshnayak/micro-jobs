import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = ({ chatRoomId, senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/${chatRoomId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages.');
      }
    };

    if (chatRoomId) {
      fetchMessages();
    }
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    console.log('chatRoomId:', chatRoomId);
  console.log('senderId:', senderId);
  console.log('receiverId:', receiverId);
  console.log('newMessage:', newMessage);
    if (!newMessage || !chatRoomId || !senderId || !receiverId) {
      console.error('All fields are required.');
      toast.error('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/chat/${chatRoomId}/messages`,
        {
          senderId,
          receiverId,
          message: newMessage,
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send the message.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
